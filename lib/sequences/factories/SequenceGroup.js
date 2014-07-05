module.exports = SequenceGroup;

var extends_ = require('typedef')['extends'];
var Sequence = require('../../Sequence.js');

extends_(SequenceGroup, Sequence);

/**
 * @constructor
 * @param {string} key
 * @param {Iterable} source
 */
function SequenceGroup(key, source)
{
  Sequence.call(this, source);
  this.key = key;
}

