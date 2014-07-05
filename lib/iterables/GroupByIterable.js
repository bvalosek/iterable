module.exports = GroupByIterable;

var Iterable      = require('../Iterable.js');
var IterableGroup = require('./factories/IterableGroup.js');

/**
 * @constructor
 * @param {Iterable} source
 * @param {function(item:any): string} keySelector
 * @param {function(item:any): any} elementSelector
 */
function GroupByIterable(source, keySelector, elementSelector)
{
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
    var key = ''+this.select(item);
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
  var items = this.groups[key];
  var grouping = new IterableGroup(key, Iterable.from(items));

  return { done: false, value: grouping };
};

