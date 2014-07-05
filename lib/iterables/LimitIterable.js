module.exports = LimitIterable;

var Iterable = require('../Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {number} skip
 * @param {number=} take
 */
function LimitIterable(source, skip, take)
{
  this.source = source;
  this.skip   = skip;
  this.take   = take;
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
  var limited = this.take !== undefined;

  if (limited && this.take <= 0)
    return { done: true, value: undefined };

  // Run thrugh the skips
  while (this.skip-- > 0)
    this.iter.next();

  if (limited)
    this.take--;

  return this.iter.next();
};

