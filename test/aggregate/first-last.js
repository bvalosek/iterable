var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('Empty sequence', function(t) {
  t.plan(4);
  t.strictEqual(Sequence.empty.first(), undefined);
  t.strictEqual(Sequence.empty.first(function(x) { return true; }), undefined);
  t.strictEqual(Sequence.empty.last(), undefined);
  t.strictEqual(Sequence.empty.last(function(x) { return true; }), undefined);
});

test('Basic first last', function(t) {
  t.plan(2);
  var s = Sequence.from([1,2,3]);
  t.strictEqual(s.first(), 1);
  t.strictEqual(s.last(), 3);
});

test('First last with predicate', function(t) {
  t.plan(2);
  var s = Sequence.from([1,2,3,4]);
  t.strictEqual(s.first(function(x) { return x > 1; }), 2);
  t.strictEqual(s.last(function(x) { return x < 4; }), 3);
});

test('Missed elements', function(t) {
  t.plan(2);
  var s = Sequence.from([1,2,3,4]);
  t.strictEqual(s.first(function(x) { return x > 10; }), undefined);
  t.strictEqual(s.last(function(x) { return x > 10; }), undefined);
});

test('Param validation', function(t) {
  t.plan(2);
  t.throws(function() { Sequence.empty.first('garbage'); }, TypeError);
  t.throws(function() { Sequence.empty.last('garbage'); }, TypeError);
});
