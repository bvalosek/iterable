module.exports = IterableRange;

/**
 * @constructor
 * @param {number} start
 * @param {number} count
 */
function IterableRange(start, count)
{
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






