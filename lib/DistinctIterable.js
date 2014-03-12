module.exports = DistinctIterable;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any): any} select
 */
function DistinctIterable(source, select)
{
  this.source = source;
  this.select = select;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
DistinctIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a DistinctIterable.
 * @constructor
 * @param {DistinctIterable} iterable
 */
function Iterator(iterable)
{
  this.iter   = iterable.source.iterator();
  this.select = iterable.select;
  this.items  = [];
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  for (var n; !(n = this.iter.next()).done; ) {
    var item = this.select(n.value);
    if (~this.items.indexOf(item))
      continue;
    this.items.push(item);
    return { done: false, value: n.value };
  }

  return { done: true, value: undefined };
};


