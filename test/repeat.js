var test           = require('tape');
var util           = require('./util.js');
var IterableRepeat = require('../lib/IterableRepeat.js');

test('Basic repeat', function(t) {
  t.plan(1);
  var r = new IterableRepeat('a', 3);
  t.ok(util.iterableEqualArray(r, ['a', 'a', 'a']));
});

test('Empty repeat', function(t) {
  t.plan(1);
  var r = new IterableRepeat('a', 0);
  t.ok(util.iterableEqualArray(r, []));
});

test('Null elements', function(t) {
  t.plan(1);
  var r = new IterableRepeat(null, 3);
  t.ok(util.iterableEqualArray(r, [null, null, null]));
});

test('Count type check', function(t) {
  t.plan(4);
  t.throws(function() { new IterableRepeat(null, null); }, TypeError);
  t.throws(function() { new IterableRepeat(null, false); }, TypeError);
  t.throws(function() { new IterableRepeat(null, '3'); }, TypeError);
  t.throws(function() { new IterableRepeat(null, {}); }, TypeError);
});

test('Count range check', function(t) {
  t.plan(1);
  t.throws(function() { new IterableRepeat(null, -1); }, RangeError);
});
