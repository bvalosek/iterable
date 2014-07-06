module.exports = ExceptIterable;

var Iterable = require('../Iterable.js');

/**
 * @constructor
 * @param {Iterable} first
 * @param {Iterable} second
 */
function ExceptIterable(first, second)
{
  if (!Iterable.isIterable(first))
    throw new TypeError('first');
  if (!Iterable.isIterable(second))
    throw new TypeError('second');

  this.first = first;
  this.second = second;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
ExceptIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a ExceptIterable.
 * @constructor
 * @param {ExceptIterable} iterable
 */
function Iterator(iterable)
{
  this.iterA = iterable.first.iterator();
  this.iterB = iterable.second.iterator();

  this.buffer = null;
}

Iterator.prototype.fillBuffer = function()
{
  this.buffer = [];

  for (var n; !(n = this.iterB.next()).done; ) {
    this.buffer.push(n.value);
  }
};

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.buffer === null)
    this.fillBuffer();

  for (var n; !(n = this.iterA.next()).done; ) {
    var item = n.value;
    if (!~this.buffer.indexOf(item))
      return n;
  }

  return { done: true, value: undefined };
};

