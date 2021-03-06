module.exports = Iterable;

var Iterator = require('./Iterator.js');

/**
 * The main interface for allowing a class to be iterable. This is an abstract
 * base class meant to serve as a reference for actual iterable classes, and
 * provides no actual functionality except for the utility static methods.
 * @constructor
 */
function Iterable()
{

}

/**
 * Determine if an object is iterable. Assumes if the object has an iterator
 * function then its iterable (may not necesarily be true though).
 * @param {any} thing
 * @return {bool} True if the thing is iterable.
 */
Iterable.isIterable = function(thing)
{
  // Fix the issue of Firefox having a string.prototype.iterator function..
  if (typeof(thing) === 'string') return false;

  return (thing && typeof(thing.iterator) === 'function');
};

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
Iterable.prototype.iterator = function()
{
  return new Iterator();
};

