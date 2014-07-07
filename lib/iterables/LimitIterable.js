module.exports = LimitIterable;

var Iterable = require('../Iterable.js');

// Number.MAX_VALUE is for floating point, for int32 we need these values
// http://ecma262-5.com/ELS5_HTML.htm#Section_8.5
var MAX_INT = LimitIterable.MAX_VALUE = 9007199254740992;

/**
 * @constructor
 * @param {Iterable} source
 * @param {number} skip
 * @param {number=} take
 */
function LimitIterable(source, skip, take)
{
  if (!Iterable.isIterable(source))
    throw new TypeError('source');
  if (skip !== undefined && typeof(skip) !== 'number')
    throw new TypeError('skip');
  if (take !== undefined && typeof(take) !== 'number')
    throw new TypeError('take');
  if (skip !== undefined && skip > MAX_INT)
    throw new RangeError('skip');
  if (take !== undefined && take > MAX_INT)
    throw new RangeError('take');
  if (skip !== undefined && skip < 0)
    throw new RangeError('skip');
  if (take !== undefined && take < 0)
    throw new RangeError('take');

  this.source = source;
  this.skip   = skip || 0;
  this.take   = take !== undefined ? take : null;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
LimitIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a LimitIterable.
 * @constructor
 * @param {LimitIterable} iterable
 */
function Iterator(iterable)
{
  this.iter = iterable.source.iterator();
  this.skip = iterable.skip;
  this.take = iterable.take;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  var limited = this.take !== null;

  if (limited && this.take <= 0)
    return { done: true, value: undefined };

  // Run thrugh the skips
  while (this.skip-- > 0)
    this.iter.next();

  if (limited)
    this.take--;

  return this.iter.next();
};

