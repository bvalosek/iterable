module.exports = Sequence;

var Iterable           = require('./Iterable.js');
var Iterator           = require('./Iterator.js');
var IterableRange      = require('./IterableRange.js');
var IterableRepeat     = require('./IterableRepeat.js');
var WhereIterable      = require('./WhereIterable.js');
var SelectIterable     = require('./SelectIterable.js');
var ConcatIterable     = require('./ConcatIterable.js');
var DistinctIterable   = require('./DistinctIterable.js');
var LimitIterable      = require('./LimitIterable.js');
var LimitWhileIterable = require('./LimitWhileIterable.js');
var ReverseIterable    = require('./ReverseIterable.js');
var SelectManyIterable = require('./SelectManyIterable.js');
var GroupByIterable    = require('./GroupByIterable.js');
var OrderByIterable    = require('./OrderByIterable.js');
var IntersectIterable  = require('./IntersectIterable.js');
var ExceptIterable     = require('./ExceptIterable.js');
var GroupBySequence    = require('./GroupBySequence.js');

function identity(x) { return x; }

/**
 * An elevated Iterable-type object that contains query and aggregrate
 * functions. Requires a source iterable.
 * @constructor
 * @param {Iterable} source
 */
function Sequence(source)
{
  if (!source || !Iterable.isIterable(source))
    throw new Error('Must provide sequence with an iterable source');

  this._source = source;
}

/**
 * Attempt to convert an object into a sequence. WOrks predicatbly for arrays,
 * strings, and iterable objects. Anything else returns a single-element
 * Sequence.
 * @param {object} source
 * @return {Sequence}
 */
Sequence.from = function(source)
{
  return new Sequence(Iterable.from(source));
};

/**
 * Create a sequence of integers.
 * @param {number} start
 * @param {number} count
 * @return {Sequence}
 */
Sequence.range = function(start, count)
{
  return new Sequence(Iterable.range(start, count));
};

/**
 * Create a sequence of finite or infinite repeating values
 * @param {any} value
 * @param {number=} count
 */
Sequence.repeat = function(value, count)
{
  return new Sequence(Iterable.repeat(value, count));
};

/**
 * Filter this sequence by a predicate clause.
 * @param {function(item:any, index:number): any} predicate
 * @return {Sequence}
 */
Sequence.prototype.where = function(predicate)
{
  return new Sequence(new WhereIterable(this, predicate));
};

/**
 * Project this sequence via a mapping function.
 * @param {function(item:any, index:number): any} predicate
 * @return {Sequence}
 */
Sequence.prototype.select = function(predicate)
{
  return new Sequence(new SelectIterable(this, predicate));
};

/**
 * Concatenate this sequenc with another.
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.concat = function(other)
{
  return new Sequence(new ConcatIterable(this, other));
};

/**
 * A sequence of elements that are unique based on a projection function.
 * @param {function(item:any): any} select
 * @return {Sequence}
 */
Sequence.prototype.distinct = function(select)
{
  return new Sequence(new DistinctIterable(this, select || identity));
};

/**
 * A sequence that skips a certain number of elements.
 * @param {number} count
 * @return {Sequence}
 */
Sequence.prototype.skip = function(count)
{
  return new Sequence(new LimitIterable(this, count));
};

/**
 * Only take a specified amount of elements
 * @param {number} count
 * @return {Sequence}
 */
Sequence.prototype.take = function(count)
{
  return new Sequence(new LimitIterable(this, 0, count));
};

/**
 * Skip the first elements of a sequence so long as a predicate is true.
 * @param {function(item:any, index:number): bool} predicate
 * @return {Sequence}
 */
Sequence.prototype.skipWhile = function(predicate)
{
  return new Sequence(new LimitWhileIterable(this, predicate, null));
};

/**
 * Create a sequence that only yields the elements while a predicate holds
 * true.
 * @param {function(item:any, index:number): bool} predicate
 * @return {Sequence}
 */
Sequence.prototype.takeWhile = function(predicate)
{
  return new Sequence(new LimitWhileIterable(this, null, predicate));
};

/**
 * The reverse-ordered sequence
 * @return {Sequence}
 */
Sequence.prototype.reverse = function()
{
  return new Sequence(new ReverseIterable(this));
};

/**
 * Projects each element of the sequence into its own sequence and flattens the
 * results into a single sequence.
 * @param {function(item:any): Iterable} collectionSelector
 * @param {function(item:any, collection:Iterable): any} resultSelector
 */
Sequence.prototype.selectMany = function(collectionSelector, resultSelector)
{
  return new Sequence(new SelectManyIterable(
    this,
    collectionSelector,
    resultSelector)
  );
};

/**
 * Group the elements of this sequence by a specified key selector
 * @param {function(item:any): string} keySelector
 * @param {function(item:any): any} elementSelector
 * @return {Sequence}
 */
Sequence.prototype.groupBy = function(keySelector, elementSelector)
{
  // Transform from a Sequence of GroupedIterable into a Sequence of
  // SequenceGroup
  return new GroupBySequence(new GroupByIterable(
    this,
    keySelector,
    elementSelector)
  );
};

/**
 * Correlates the elements of this sequence and another based on matching keys.
 * @param {Sequence} inner
 * @param {function(item:any): string} outerKeySelector
 * @param {function(item:any): string} innerKeySelector
 * @return {Sequence}
 */
Sequence.prototype.join = function(inner, outerKeySelector, innerKeySelector)
{
  return this;
};

/**
 * Return a sequence of elements that is the set union between this sequence an
 * another
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.union = function(other)
{
  return this.concat(other).distinct();
};

/**
 * Produces the set intersection of this sequence and another.
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.intersect = function(other)
{
  return new Sequence(new IntersectIterable(this, other)).distinct();
};

/**
 * Produces the set difference between this sequence and another.
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.except = function(other)
{
  return new Sequence(new ExceptIterable(this, other)).distinct();
};

/**
 * Create a sorted sequence in ascending order based on a key.
 * @param {function(item): number} keySelector
 */
Sequence.prototype.orderBy = function(keySelector)
{
  return new Sequence(new OrderByIterable(this, keySelector, false));
};

/**
 * Create a sorted sequence in descending order based on a key.
 * @param {function(item): number} keySelector
 */
Sequence.prototype.orderByDescending = function(keySelector)
{
  return new Sequence(new OrderByIterable(this, keySelector, true));
};

/**
 * Apply an accumulator funciton over the sequence and return the result.
 * @param {function(accumulator:any, item:any): any} func
 * @param {any=} seed
 * @return {any}
 */
Sequence.prototype.reduce = function(func, seed)
{
  var iter = this.iterator();

  // If seed isn't provided, its the first value. If we dont have anything,
  // then return null.
  if (seed === undefined) {
    var _ref = iter.next();
    if (_ref.done)
      return undefined;
    seed = _ref.value;
  }

  var acc = seed;
  for (var n; !(n = iter.next()).done; ) {
    acc = func(acc, n.value);
  }
  return acc;
};

/**
 * Get the element at a specified index
 * @param {number} index
 * @return {any}
 */
Sequence.prototype.elementAt = function(index)
{
  var i = 0;

  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var item = n.value;
    if (i++ === index)
      return item;
  }

  return undefined;
};

/**
 * Determine if this sequence contains a specified item.
 * @param {any} item
 * @return {bool} True if the sequence contains this item
 */
Sequence.prototype.contains = function(item)
{
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (n.value === item)
      return true;
  }

  return false;
};

/**
 * Return true if any of the elements in this sequence match the predicate. If
 * no predicate is provided, return true if there are ANY elements in this
 * selection.
 * @param {function(item:any): bool} predicate
 * @return {bool}
 */
Sequence.prototype.any = function(predicate)
{
  if (!predicate)
    return !this.iterator().next().done;
  else if (typeof(predicate) !== 'function')
    throw new TypeError('predicate');

  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (predicate(n.value))
      return true;
  }

  return false;
};

/**
 * Return true if every element in the sequence matches satisfy a predicate.
 * @param {function(item:any): bool} predicate
 * @return {bool}
 */
Sequence.prototype.every = function(predicate)
{
  if (!predicate)
    return true;
  else if (typeof(predicate) !== 'function')
    throw new TypeError('predicate');

  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (!predicate(n.value))
      return false;
  }

  return true;
};

/**
 * Return the first element in the sequence matching a condition.
 * @param {function(item:any): bool} predicate
 * @return {any} The item
 */
Sequence.prototype.first = function(predicate)
{
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var item = n.value;
    if (!predicate || predicate(item))
      return item;
  }

  return undefined;
};

/**
 * Return the last element of the sequence that satisfies a condition.
 * @param {function(item:any): bool} f
 * @return {any}
 */
Sequence.prototype.last = function(predicate)
{
  var iter = this.iterator();
  var item;
  for (var n; !(n = iter.next()).done; ) {
    var value = n.value;
    if (!predicate || predicate(value))
      item = value;
  }

  return item;
};

/**
 * Call a funciton for each element of the sequence.
 * @param {function(item:any, index:number)} f
 */
Sequence.prototype.forEach = function(f)
{
  if (!f) return;

  var iter = this.iterator();
  var index = 0;
  for (var n; !(n = iter.next()).done; ) {
    f(n.value, index++);
  }
};

/**
 * Get the number of items in a sequence.
 * @return {number}
 */
Sequence.prototype.count = function()
{
  var count = 0;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    count++;
  }
  return count;
};

/**
 * Compute the sum of values produced by a selector function.
 * @param {function(item:any): number} selector
 * @return {number}
 */
Sequence.prototype.sum = function(selector)
{
  var f = selector || identity;
  var sum = null;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (sum === null)
      sum = f(n.value);
    else
      sum += f(n.value);
  }
  return sum;
};

/**
 * Compute the average of values produced by a selector function.
 * @param {function(item:any): number} selector
 * @return {number}
 */
Sequence.prototype.average = function(selector)
{
  var f = selector || identity;
  var sum = null;
  var count = 0;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    count++;
    if (sum === null)
      sum = f(n.value);
    else
      sum += f(n.value);
  }
  return count > 0 ? sum / count : null;
};

/**
 * Compute the minimum value produced by a selector function.
 * @param {function(item:any): number} selector
 * @return {number}
 */
Sequence.prototype.min = function(selector)
{
  var f = selector || identity;
  var min = null;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (min === null)
      min = f(n.value);
    else
      min = Math.min(min, f(n.value));
  }
  return min;
};

/**
 * Compute the maximum value produced by a selector function.
 * @param {function(item:any): number} selector
 * @return {number}
 */
Sequence.prototype.max = function(selector)
{
  var f = selector || identity;
  var max = null;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (max === null)
      max = f(n.value);
    else
      max = Math.max(max, f(n.value));
  }
  return max;
};

/**
 * Stream a sequence into an array.
 * @return {array.<any>}
 */
Sequence.prototype.toArray = function()
{
  var ret = [];
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    ret.push(n.value);
  }
  return ret;
};

/**
 * Stream a sequence into a string.
 * @param {string=} seperator
 * @return {string}
 */
Sequence.prototype.toString = function(seperator)
{
  seperator = seperator || '';
  return this.toArray().join(seperator);
};

/**
 * Create and return a new Iterator.
 * @return {Iterator}
 */
Sequence.prototype.iterator = function()
{
  return this._source.iterator();
};

