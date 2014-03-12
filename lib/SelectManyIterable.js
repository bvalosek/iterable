module.exports = SelectManyIterable;

var Iterable = require('./Iterable.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any, index:number): Iterable} collectionSelector
 * @param {function(item:any, collection:Iterable): any} resultSelector
 */
function SelectManyIterable(source, collectionSelector, resultSelector)
{
  this.source = source;
  this.select = collectionSelector;
  this.result = resultSelector;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
SelectManyIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a SelectManyIterable.
 * @constructor
 * @param {SelectManyIterable} iterable
 */
function Iterator(iterable)
{
  this.current     = null;
  this.currentItem = null;
  this.select      = iterable.select;
  this.result      = iterable.result;
  this.iter        = iterable.source.iterator();
  this.index       = 0;
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  // If we don't have anything, get the next item from the source and begin
  // yielding its items. When this finishes, we're done
  if (this.current === null) {
    var n = this.iter.next();
    if (n.done)
      return n;

    this.currentItem = n.value;

    // Get an iterator for this current sublist
    var proj = this.select(n.value, this.index++);
    this.current = Iterable.from(proj).iterator();
  }

  // Yield out from the sub lists
  for (var m; !(m = this.current.next()).done; ) {
    var item = m.value;
    if (this.result)
      item = this.result(this.currentItem, item);
    return { done: false, value: item };
  }

  // If we got here it means the sublist finished, begin yielding out the next
  // one if we've got it.
  this.current = null;
  return this.next();
};

