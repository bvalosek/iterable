var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('Plain nums', function(t) {
  t.plan(4);
  var s = Sequence.from([2,3,4,1,5,3]);
  t.strictEqual(s.min(), 1);
  t.strictEqual(s.max(), 5);
  t.strictEqual(s.sum(), 18);
  t.strictEqual(s.average(), 3);
});

test('Select nums', function(t) {
  t.plan(4);
  var s = Sequence.from([2,3,4,1,5,3]);
  function f(x) { return x * 2; }
  t.strictEqual(s.min(f), 2);
  t.strictEqual(s.max(f), 10);
  t.strictEqual(s.sum(f), 36);
  t.strictEqual(s.average(f), 6);
});

test('Empty sequence', function(t) {
  t.plan(4);
  t.strictEqual(Sequence.empty.min(), undefined);
  t.strictEqual(Sequence.empty.max(), undefined);
  t.strictEqual(Sequence.empty.sum(), undefined);
  t.strictEqual(Sequence.empty.average(), undefined);
});

test('Param validation', function(t) {
  t.plan(4);
  t.throws(function() { Sequence.empty.min('garbage'); }, TypeError);
  t.throws(function() { Sequence.empty.max('garbage'); }, TypeError);
  t.throws(function() { Sequence.empty.sum('garbage'); }, TypeError);
  t.throws(function() { Sequence.empty.average('garbage'); }, TypeError);
});
