module.exports = ReverseIterable;

var Iterable = require('../Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 */
function ReverseIterable(source)
{
  if (!Iterable.isIterable(source))
    throw new TypeError('source');

  this.source = source;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
ReverseIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a ReverseIterable.
 * @constructor
 * @param {ReverseIterable} iterable
 */
function Iterator(iterable)
{
  this.iter     = iterable.source.iterator();
  this.position = 0;
  this.buffer   = null;
}

Iterator.prototype.fillBuffer = function()
{
  this.buffer = [];
  for (var n; !(n = this.iter.next()).done; ) {
    this.buffer.push(n.value);
  }
  this.position = this.buffer.length - 1;
};

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.buffer === null)
    this.fillBuffer();

  if (this.position < 0)
    return { done: true, value: undefined };

  return { done: false, value: this.buffer[this.position--] };
};

