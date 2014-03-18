module.exports = IterableString;

/**
 * @constructor
 * @param {string} source
 */
function IterableString(source)
{
  if (typeof(source) !== 'string')
    throw new TypeError('source');

  this.source = source;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IterableString.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a IterableString.
 * @constructor
 * @param {IterableString} iterable
 */
function Iterator(iterable)
{
  this.source = iterable.source;
  this.position = 0;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.position >= this.source.length)
    return { done: true, value: undefined };

  return { done: false, value: this.source.charAt(this.position++) };
};






