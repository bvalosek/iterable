module.exports = IterableRepeat;

/**
 * @constructor
 * @param {any} value
 * @param {number} count
 */
function IterableRepeat(value, count)
{
  if (typeof count !== 'number')
    throw new TypeError('count');
  if (count < 0)
    throw new RangeError('count');

  this.value = value;
  this.count = count;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IterableRepeat.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a IterableRepeat.
 * @constructor
 * @param {IterableRepeat} iterable
 */
function Iterator(iterable)
{
  this.value = iterable.value;
  this.count = iterable.count;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  var limited = this.count !== undefined;

  if (limited && this.count <= 0)
    return { done: true, value: undefined };

  if (limited)
    this.count--;

  return { done: false, value: this.value };
};






