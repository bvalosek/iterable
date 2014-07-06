var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('param validation', function(t) {
  t.plan(2);
  t.throws(function() { Sequence.from([1,2,3]).elementAt('asdf'); }, TypeError);
  t.throws(function() { Sequence.from([1,2,3]).elementAt(); }, TypeError);
});

test('basic', function(t) {
  t.plan(1);
  t.strictEqual(1, Sequence.from([1]).elementAt(0));
});

test('Throw on out of bounds', function(t) {
  t.plan(2);
  t.throws(function() { Sequence.from([1]).elementAt(2); }, RangeError);
  t.throws(function() { Sequence.from([1]).elementAt(-1); }, RangeError);
});
