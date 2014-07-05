module.exports = IntersectIterable;

var Iterable = require('../Iterable.js');

/**
 * @constructor
 * @param {Iterable} first
 * @param {Iterable} second
 */
function IntersectIterable(first, second)
{
  this.first = first;
  this.second = second;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IntersectIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a IntersectIterable.
 * @constructor
 * @param {IntersectIterable} iterable
 */
function Iterator(iterable)
{
  this.iterA  = iterable.first.iterator();
  this.iterB  = iterable.second.iterator();
  this.buffer = [];
}

/**
 * Check to see if we have something in the buffer or consume B until we do
 * @return {boolean}
 */
Iterator.prototype.isInB = function(val)
{
  if (~this.buffer.indexOf(val))
    return true;

  for (var n; !(n = this.iterB.next()).done; ) {
    var item = n.value;
    this.buffer.push(item);
    if (item === val)
      return true;
  }

  return false;
};


/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  for (var n; !(n = this.iterA.next()).done; ) {
    var item = n.value;
    if (this.isInB(item))
      return n;
  }

  return { done: true, value: undefined };
};

