module.exports = iterableFactory;

var Iterable       = require('../../Iterable.js');
var IterableRange  = require('./IterableRange.js');
var IterableRepeat = require('./IterableRepeat.js');
var IterableArray  = require('./IterableArray.js');
var IterableString = require('./IterableString.js');

/**
 * Attempt to turn some rando source into an Iterable
 * @param {any} source
 * @return {Iterable}
 */
function iterableFactory(source)
{
  if (Object.prototype.toString.call(source) === '[object Array]')
    return new IterableArray(source);

  if (Iterable.isIterable(source))
    return source;

  if (typeof(source) === 'string')
    return new IterableString(source);

  // Default to a single-element iterable
  return new IterableArray([source]);
}
