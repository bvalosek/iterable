module.exports = ConcatIterable;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {Iterable} first
 * @param {Iterable} second
 */
function ConcatIterable(first, second)
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
ConcatIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a ConcatIterable.
 * @constructor
 * @param {ConcatIterable} iterable
 */
function Iterator(iterable)
{
  this.first = iterable.first.iterator();
  this.second = iterable.second.iterator();
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  for (var n; !(n = this.first.next()).done; ) {
    return n;
  }

  for ( ; !(n = this.second.next()).done; ) {
    return n;
  }

  return { done: true, value: undefined };
};






