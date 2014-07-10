module.exports = GroupByIterable;

var Iterable        = require('../Iterable.js');
var IterableGroup   = require('./factories/IterableGroup.js');
var iterableFactory = require('./factories/iterableFactory.js');

/**
 * Creates an iterable of IterableGroup objects
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any): string} keySelector
 * @param {function(item:any): any} elementSelector
 */
function GroupByIterable(source, keySelector, elementSelector)
{
  if (!Iterable.isIterable(source))
    throw new TypeError('source');
  if (typeof(keySelector) !== 'function')
    throw new TypeError('keySelector');
  if (elementSelector && typeof(elementSelector) !== 'function')
    throw new TypeError('elementSelector');

  this.source = source;
  this.select = keySelector;
  this.proj   = elementSelector;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
GroupByIterable.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a GroupByIterable.
 * @constructor
 * @param {GroupByIterable} iterable
 */
function Iterator(iterable)
{
  this.iter     = iterable.source.iterator();
  this.select   = iterable.select;
  this.proj     = iterable.proj;
  this.groups   = null;
  this.keys     = [];
  this.realKeys = {};
  this.position = 0;
}

/**
 * Eagerly create the groups
 */
Iterator.prototype.createGroups = function()
{
  this.groups = {};

  for (var n; !(n = this.iter.next()).done; ) {
    var item = n.value;
    var realKey = this.select(item);
    var key = ''+realKey;
    this.realKeys[key] = realKey;
    var group = this.groups[key];
    if (!group) {
      group = this.groups[key] = [];
      this.keys.push(key);
    }
    if (this.proj)
      group.push(this.proj(item));
    else
      group.push(item);
  }
};

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  if (this.groups === null)
    this.createGroups();

  if (this.position >= this.keys.length)
    return { done: true, value: undefined };

  var key = this.keys[this.position++];
  var realKey = this.realKeys[key];
  var items = this.groups[key];
  var grouping = new IterableGroup(realKey, iterableFactory(items));

  return { done: false, value: grouping };
};

