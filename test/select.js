var test          = require('tape');
var util          = require('./util.js');
var SelectIterable = require('../lib/SelectIterable.js');

test('Iterable interface', function(t) {
  t.plan(1);
  var s = new SelectIterable(util.empty(), util.identity);
  t.ok(util.implementsIterable(s));
});

test('Basic projection', function(t) {
  t.plan(1);
  var source = util.fromArray([1,2,3]);
  var s = new SelectIterable(source, function(x) { return x + '!'; });
  t.ok(util.iterableEqualArray(s, ['1!', '2!', '3!']));
});

test('Side effects and lazy eval', function(t) {
  t.plan(3);
  var count = 0;
  var source = util.fromArray([1,2,3]);
  var s = new SelectIterable(source, function() { return count++; });
  t.ok(util.iterableEqualArray(s, [0,1,2]));
  t.ok(util.iterableEqualArray(s, [3,4,5]));
  count = 10;
  t.ok(util.iterableEqualArray(s, [10,11,12]));
});

test('Param validation', function(t) {
  t.plan(5);
  t.throws(function() { new SelectIterable(null, util.identity); }, TypeError);

  // why does FF barf on this??
  // t.throws(function() { new SelectIterable('garbage', util.identity); }, TypeError);

  t.throws(function() { new SelectIterable(true, util.identity); }, TypeError);
  t.throws(function() { new SelectIterable(util.empty(), null); }, TypeError);
  t.throws(function() { new SelectIterable(util.empty(), {}); }, TypeError);
  t.throws(function() { new SelectIterable(util.empty(), true); }, TypeError);
});
