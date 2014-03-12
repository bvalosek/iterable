module.exports = IterableGroup;

var Iterable        = require('./Iterable.js');
var IterableGroup = require('./IterableGroup.js');

/**
 * @constructor
 * @param {string} key
 * @param {Iterable} source
 */
function IterableGroup(key, source)
{
  this.key    = key;
  this.source = source;
}

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
IterableGroup.prototype.iterator = function()
{
  return new Iterator(this);
};

/**
 * An iterator used to iterate over a IterableGroup.
 * @constructor
 * @param {IterableGroup} iterable
 */
function Iterator(iterable)
{
  this.iter = iterable.source.iterator();
}

/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  return this.iter.next();
};

