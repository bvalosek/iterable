module.exports = OrderByIterable;

var Iterable = require('./Iterable');

function defaultComparer(a, b) { return b - a; }

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any): number} keySelector
 * @param {boolean} descending
 * @param {function(a: any, b:any): number} comparer
 */
function OrderByIterable(source, keySelector, descending, comparer)
{
  this.source     = source;
  this.select     = keySelector;
  this.compare    = comparer || defaultComparer;
  this.descending = !!descending;

  this.buffer     = null;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
OrderByIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a OrderByIterable.
 * @constructor
 * @param {OrderByIterable} iterable
 */
function Iterator(iterable)
{
  this.iter       = iterable.source.iterator();
  this.compare    = iterable.compare;
  this.select     = iterable.select;
  this.descending = iterable.descending;

  this.buffer     = null;
  this.position   = 0;
}

Iterator.prototype.fillBuffer = function()
{
  this.buffer = [];

  var iter       = this.iter;
  var buffer     = this.buffer;
  var select     = this.select;
  var compare    = this.compare;
  var descending = this.descending;

  function compareFn(a, b) {
    if (descending)
      return compare(select(a), select(b));
    else
      return compare(select(b), select(a));
  }

  for (var n; !(n = iter.next()).done; ) {
    var item = n.value;
    buffer.push(item);
  }
  buffer.sort(compareFn);
};

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.buffer === null)
    this.fillBuffer();

  if (this.position >= this.buffer.length)
    return { done: true, value: undefined };

  return { done: false, value: this.buffer[this.position++] };
};

