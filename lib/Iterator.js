module.exports = Iterator;

/**
 * The interface for an iterator object. This is the abstract base class meant
 * to serve as a reference for concrete implementations and provides no actual
 * funcitonality.
 * @constructor
 */
function Iterator()
{

}

/**
 * Determine if an object is an iterator. Assumes if it has a function called
 * next then its legit (may not necesarily be true).
 * @param {object} thing
 * @return {bool} True if the thing is an iterator
 */
Iterator.isIterator = function(thing)
{
  return (thing && typeof(thing.next) === 'function');
};


/**
 * Get the next value in the iteration.
 * @return {{done:bool, value:any}}
 */
Iterator.prototype.next = function()
{
  return { done: true, value: undefined };
};

