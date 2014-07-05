var test           = require('tape');
var util           = require('./util.js');
var ConcatIterable = require('../lib/iterables/ConcatIterable.js');

test('Lazy eval for first', function(t) {
  t.plan(1);
  new ConcatIterable(util.throwingIterable(), util.empty());
  t.pass();
});

test('Lazy eval for second', function(t) {
  t.plan(1);
  new ConcatIterable(util.empty(), util.throwingIterable());
  t.pass();
});

test('Basic concats', function(t) {
  t.plan(1);
  var c = new ConcatIterable(util.fromArray([1,2]), util.fromArray([3,4]));
  t.ok(util.iterableEqualArray(c, [1,2,3,4]));
});

test('Empty first', function(t) {
  t.plan(1);
  var c = new ConcatIterable(util.empty(), util.fromArray([3,4]));
  t.ok(util.iterableEqualArray(c, [3,4]));
});

test('Empty second', function(t) {
  t.plan(1);
  var c = new ConcatIterable(util.fromArray([1,2]), util.empty());
  t.ok(util.iterableEqualArray(c, [1,2]));
});

test('Param validation', function(t) {
  t.plan(8);
  t.throws(function() { new ConcatIterable(true, util.empty()); }, TypeError);
  t.throws(function() { new ConcatIterable(null, util.empty()); }, TypeError);
  t.throws(function() { new ConcatIterable({}, util.empty()); }, TypeError);
  t.throws(function() { new ConcatIterable(123, util.empty()); }, TypeError);
  t.throws(function() { new ConcatIterable(util.empty(), true); }, TypeError);
  t.throws(function() { new ConcatIterable(util.empty(), null); }, TypeError);
  t.throws(function() { new ConcatIterable(util.empty(), {}); }, TypeError);
  t.throws(function() { new ConcatIterable(util.empty(), 123); }, TypeError);
});
