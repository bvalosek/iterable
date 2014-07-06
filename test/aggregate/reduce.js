var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('Basic reduce with no seed', function(t) {
  t.plan(1);
  var s = Sequence.from([0, 1, 4, 5]);
  var v = s.reduce(function(acc, x) { return acc + x * 2; });
  t.strictEqual(v, 20);
});

test('Basic reduce with seed', function(t) {
  t.plan(1);
  var s = Sequence.from([1, 4, 5]);
  var v = s.reduce(function(acc, x) { return acc + x * 2; }, 0);
  t.strictEqual(v, 20);
});

test('Empty sequence', function(t) {
  t.plan(1);
  t.strictEqual(Sequence.empty.reduce(function() { }), undefined);
});

test('Param validation', function(t) {
  t.plan(2);
  t.throws(function() { Sequence.empty.reduce(); }, TypeError);
  t.throws(function() { Sequence.empty.reduce('garbage'); }, TypeError);
});
