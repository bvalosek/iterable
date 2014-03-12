module.exports = WhereIterable;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any, index:number): bool} predicate
 */
function WhereIterable(source, predicate)
{
  this.source = source;
  this.predicate = predicate;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
WhereIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a WhereIterable.
 * @constructor
 * @param {WhereIterable} iterable
 */
function Iterator(iterable)
{
  this.iter      = iterable.source.iterator();
  this.predicate = iterable.predicate;
  this.index     = 0;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  for (var n; !(n = this.iter.next()).done; ) {
    var item = n.value;
    var selected =  this.predicate(item, this.index);
    this.index++;
    if (selected)
      return { done: false, value: item };
  }

  return { done: true, value: undefined };
};






