module.exports = Sequence;

var Iterable           = require('./Iterable.js');
var Iterator           = require('./Iterator.js');
var iterableFactory    = require('./iterables/factories/iterableFactory.js');

var IterableRange      = require('./iterables/factories/IterableRange.js');
var IterableRepeat     = require('./iterables/factories/IterableRepeat.js');

var ConcatIterable     = require('./iterables/ConcatIterable.js');
var DistinctIterable   = require('./iterables/DistinctIterable.js');
var ExceptIterable     = require('./iterables/ExceptIterable.js');
var GroupByIterable    = require('./iterables/GroupByIterable.js');
var IntersectIterable  = require('./iterables/IntersectIterable.js');
var LimitIterable      = require('./iterables/LimitIterable.js');
var LimitWhileIterable = require('./iterables/LimitWhileIterable.js');
var OrderByIterable    = require('./iterables/OrderByIterable.js');
var ReverseIterable    = require('./iterables/ReverseIterable.js');
var SelectIterable     = require('./iterables/SelectIterable.js');
var SelectManyIterable = require('./iterables/SelectManyIterable.js');
var WhereIterable      = require('./iterables/WhereIterable.js');

var GroupBySequence    = require('./sequences/GroupBySequence.js');

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
  return new (this)(iterableFactory(source));
};

/**
 * Get an empty sequence
 * @return {Sequence}
 */
Sequence.empty = function()
{
  return this.from([]);
};

/**
 * Create a sequence of integers.
 * @param {number} start
 * @param {number} count
 * @return {Sequence}
 */
Sequence.range = function(start, count)
{
  return new (this)(Iterable.range(start, count));
};

/**
 * Create a sequence of finite or infinite repeating values
 * @param {any} value
 * @param {number=} count
 */
Sequence.repeat = function(value, count)
{
  return new (this)(Iterable.repeat(value, count));
};

/**
 * Filter this sequence by a predicate clause.
 * @param {function(item:any, index:number): any} predicate
 * @return {Sequence}
 */
Sequence.prototype.where = function(predicate)
{
  return new (this.constructor)(new WhereIterable(this, predicate));
};

/**
 * Project this sequence via a mapping function.
 * @param {function(item:any, index:number): any} predicate
 * @return {Sequence}
 */
Sequence.prototype.select = function(predicate)
{
  return new (this.constructor)(new SelectIterable(this, predicate));
};

/**
 * Concatenate this sequenc with another.
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.concat = function(other)
{
  return new (this.constructor)(new ConcatIterable(this, other));
};

/**
 * A sequence of elements that are unique based on a projection function.
 * @param {function(item:any): any} select
 * @return {Sequence}
 */
Sequence.prototype.distinct = function(select)
{
  return new (this.constructor)(new DistinctIterable(this, select || identity));
};

/**
 * A sequence that skips a certain number of elements.
 * @param {number} count
 * @return {Sequence}
 */
Sequence.prototype.skip = function(count)
{
  return new (this.constructor)(new LimitIterable(this, count));
};

/**
 * Only take a specified amount of elements
 * @param {number} count
 * @return {Sequence}
 */
Sequence.prototype.take = function(count)
{
  return new (this.constructor)(new LimitIterable(this, 0, count));
};

/**
 * Skip the first elements of a sequence so long as a predicate is true.
 * @param {function(item:any, index:number): bool} predicate
 * @return {Sequence}
 */
Sequence.prototype.skipWhile = function(predicate)
{
  return new (this.constructor)(new LimitWhileIterable(this, predicate, null));
};

/**
 * Create a sequence that only yields the elements while a predicate holds
 * true.
 * @param {function(item:any, index:number): bool} predicate
 * @return {Sequence}
 */
Sequence.prototype.takeWhile = function(predicate)
{
  return new (this.constructor)(new LimitWhileIterable(this, null, predicate));
};

/**
 * The reverse-ordered sequence
 * @return {Sequence}
 */
Sequence.prototype.reverse = function()
{
  return new (this.constructor)(new ReverseIterable(this));
};

/**
 * Projects each element of the sequence into its own sequence and flattens the
 * results into a single sequence.
 * @param {function(item:any): Iterable} collectionSelector
 * @param {function(item:any, collection:Iterable): any} resultSelector
 */
Sequence.prototype.selectMany = function(collectionSelector, resultSelector)
{
  return new (this.constructor)(new SelectManyIterable(
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
  throw new Error('not implemented');
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
  return new (this.constructor)(new IntersectIterable(this, other)).distinct();
};

/**
 * Produces the set difference between this sequence and another.
 * @param {Sequence} other
 * @return {Sequence}
 */
Sequence.prototype.except = function(other)
{
  return new (this.constructor)(new ExceptIterable(this, other)).distinct();
};

/**
 * Create a sorted sequence in ascending order based on a key.
 * @param {function(item): number} keySelector
 */
Sequence.prototype.orderBy = function(keySelector)
{
  return new (this.constructor)(new OrderByIterable(this, keySelector, false));
};

/**
 * Create a sorted sequence in descending order based on a key.
 * @param {function(item): number} keySelector
 */
Sequence.prototype.orderByDescending = function(keySelector)
{
  return new (this.constructor)(new OrderByIterable(this, keySelector, true));
};

/**
 * Apply an accumulator funciton over the sequence and return the result.
 * @param {function(accumulator:any, item:any): any} func
 * @param {any=} seed
 * @return {any}
 */
Sequence.prototype.reduce = function(func, seed)
{
  if (typeof(func) !== 'function')
    throw new TypeError('func');

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
  if (typeof(index) !== 'number')
    throw new TypeError('index');
  if (index < 0)
    throw new RangeError('index');

  var i = 0;

  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var item = n.value;
    if (i++ === index)
      return item;
  }

  throw new RangeError('index out of bound');
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
  if (predicate && typeof(predicate) !== 'function')
    throw new TypeError('predicate');

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
  if (predicate && typeof(predicate) !== 'function')
    throw new TypeError('predicate');

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
  if (typeof(f) !== 'function')
    throw new TypeError('f');

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
  if (selector && typeof(selector) !== 'function')
    throw new TypeError('selector');

  var f = selector || identity;
  var sum;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    if (sum === undefined)
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
  if (selector && typeof(selector) !== 'function')
    throw new TypeError('selector');

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
  return count > 0 ? sum / count : undefined;
};

/**
 * Compute the minimum value produced by a selector function.
 * @param {function(item:any): number} selector
 * @return {number}
 */
Sequence.prototype.min = function(selector)
{
  if (selector && typeof(selector) !== 'function')
    throw new TypeError('selector');

  var f = selector || identity;
  var min;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var val = f(n.value);
    if (min === undefined || val < min)
      min = val;
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
  if (selector && typeof(selector) !== 'function')
    throw new TypeError('selector');

  var f = selector || identity;
  var max;
  var iter = this.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var val = f(n.value);
    if (max === undefined || val > max)
      max = val;
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

