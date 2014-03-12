module.exports = Iterable;

var Iterator = require('./Iterator.js');

var IterableArray    = require('./IterableArray.js');
var IterableRange    = require('./IterableRange.js');
var IterableString   = require('./IterableString.js');
var IterableRepeat   = require('./IterableRepeat.js');

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
 * Create an iterable range of integers.
 * @param {number} start
 * @param {number=} count
 * @return {Iterable}
 */
Iterable.range = function(start, count)
{
  return new IterableRange(start, count);
};

/**
 * Create a sequence of repeating values.
 * @param {any} value
 * @param {number=} count
 * @return {Iterable}
 */
Iterable.repeat = function(value, count)
{
  return new IterableRepeat(value, count);
};

/**
 * Determine if an object is iterable. Assumes if the object has an iterator
 * function then its iterable (may not necesarily be true though).
 * @param {any} thing
 * @return {bool} True if the thing is iterable.
 */
Iterable.isIterable = function(thing)
{
  return (thing && typeof(thing.iterator) === 'function');
};

/**
 * Attempt to convert an object into a iterable object. WOrks predicatbly for
 * arrays, strings, and iterable objects. Anything else returns a
 * single-element iterable.
 * @param {object} source
 * @return {Iterable}
 */
Iterable.from = function(source)
{
  if (Object.prototype.toString.call(source) === '[object Array]')
    return new IterableArray(source);

  if (Iterable.isIterable(source))
    return source;

  if (typeof(source) === 'string')
    return new IterableString(source);

  // Default to a single-element iterable
  return new IterableArray([source]);
};

/**
 * Get an iterator for this class.
 * @return {Iterator}
 */
Iterable.prototype.iterator = function()
{
  return new Iterator();
};

