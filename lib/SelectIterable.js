module.exports = SelectIterable;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any, index:number): any} predicate
 */
function SelectIterable(source, predicate)
{
  if (!Iterable.isIterable(source))
    throw new TypeError('source');
  if (typeof predicate !== 'function')
    throw new TypeError('predicate');

  this.source = source;
  this.predicate = predicate;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
SelectIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a SelectIterable.
 * @constructor
 * @param {SelectIterable} iterable
 */
function Iterator(iterable)
{
  this.iter = iterable.source.iterator();
  this.select = iterable.predicate;
  this.index = 0;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  for (var n; !(n = this.iter.next()).done; ) {
    return {
      done: false,
      value: this.select(n.value, this.index++)
    };
  }

  return { done: true, value: undefined };
};

