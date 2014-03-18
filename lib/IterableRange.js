module.exports = IterableRange;

// Number.MAX_VALUE is for floating point, for int32 we need these values
// http://ecma262-5.com/ELS5_HTML.htm#Section_8.5
var MAX_INT = IterableRange.MAX_VALUE = 9007199254740992;
var MIN_INT = IterableRange.MIN_VALUE = -9007199254740992;

/**
 * @constructor
 * @param {number} start
 * @param {number} count
 */
function IterableRange(start, count)
{
  if (typeof start !== 'number')
    throw new TypeError('start');
  if (typeof count !== 'number')
    throw new TypeError('count');
  if (count < 0)
    throw new RangeError('count');

  if (start >= MAX_INT && count > 1)
    throw new RangeError('start');
  if (start < MIN_INT)
    throw new RangeError('start');

  this.start = start;
  this.count = count;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IterableRange.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a IterableRange.
 * @constructor
 * @param {IterableRange} iterable
 */
function Iterator(iterable)
{
  this.current = iterable.start;
  this.count   = iterable.count;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.count <= 0)
    return { done: true, value: undefined };

  this.count--;
  return { done: false, value: this.current++ };
};






