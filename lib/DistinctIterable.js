module.exports = DistinctIterable;

var Iterable = require('./Iterable.js');

require('./shim/indexOf.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any): any} select
 */
function DistinctIterable(source, select)
{
  if (!Iterable.isIterable(source))
    throw new TypeError('source');
  if (select && typeof(select) !== 'function')
    throw new TypeError('select');

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
    var item;
    if (this.select)
      item = this.select(n.value);
    else
      item = n.value;

    if (~this.items.indexOf(item))
      continue;

    this.items.push(item);
    return { done: false, value: n.value };
  }

  return { done: true, value: undefined };
};

