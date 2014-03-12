module.exports = IterableArray;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {array.<any>} source
 */
function IterableArray(source)
{
  this.source = source;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IterableArray.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over an IterableArray.
 * @constructor
 * @param {IterableArray} iterable
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

  return { done: false, value: this.source[this.position++] };
};

