module.exports = LimitWhileIterable;

var Iterable = require('../Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any, index:number): bool} skipWhile
 * @param {function(item:any, index:number): bool} takeWhile
 */
function LimitWhileIterable(source, skipWhile, takeWhile)
{
  this.source = source;
  this.skip = skipWhile;
  this.take = takeWhile;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
LimitWhileIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a LimitWhileIterable.
 * @constructor
 * @param {LimitWhileIterable} iterable
 */
function Iterator(iterable)
{
  this.iter  = iterable.source.iterator();
  this.skip  = iterable.skip || null;
  this.take  = iterable.take || null;
  this.done  = false;
  this.index = 0;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.done)
    return { done: true, value: undefined };

  for (var n; !(n = this.iter.next()).done; ) {
    var item = n.value;
    var index = this.index++;

    // If skip is set, continue if the condition is still valid, otherwise
    // clear the function and keep going.
    if (this.skip !== null) {
      if (this.skip(item, index))
        continue;
      this.skip = null;
    }

    // If we are limiting takes, set a flag once we pass the point of no return
    // and bounce
    if (this.take !== null) {
      if (!this.take(item, index)) {
        this.done = true;
        break;
      }
    }

    return n;
  }

  return { done: true, value: undefined };
};

