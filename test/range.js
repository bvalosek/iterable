var test          = require('tape');
var util          = require('./util.js');
var IterableRange = require('../lib/iterables/factories/IterableRange.js');

test('Basic sequences', function(t) {
  t.plan(2);

  var r = new IterableRange(1,10);
  t.ok(util.iterableEqualArray(r, [1,2,3,4,5,6,7,8,9,10]));

  r = new IterableRange(1,1);
  t.ok(util.iterableEqualArray(r, [1]));

});

test('Count can be zero', function(t) {
  t.plan(1);
  var r = new IterableRange(1,0);
  t.ok(util.iterableEqualArray(r, []));
});

test('Start value can be negative', function(t) {
  t.plan(1);
  var r = new IterableRange(-5,5);
  t.ok(util.iterableEqualArray(r, [-5,-4,-3,-2,-1]));
});

test('Empty range with min value', function(t) {
  t.plan(1);
  var r = new IterableRange(IterableRange.MIN_VALUE, 0);
  t.ok(util.iterableEqualArray(r, []));
});

test('Range with single element max value', function(t) {
  t.plan(1);
  var r = new IterableRange(IterableRange.MAX_VALUE, 1);
  t.ok(util.iterableEqualArray(r, [IterableRange.MAX_VALUE]));
});

test('Count can\'t be negative', function(t) {
  t.plan(1);
  t.throws(function() { var r = new IterableRange(1, -2); }, RangeError);
});

test('Range cant be above max', function(t) {
  t.plan(1);
  t.throws(function() { new IterableRange(IterableRange.MAX_VALUE, 2); }, RangeError);
});

test('Bad types for start and count', function(t) {
  t.plan(8);

  t.throws(function() { new IterableRange('1', 1); }, TypeError);
  t.throws(function() { new IterableRange(null, 1); }, TypeError);
  t.throws(function() { new IterableRange([1], 1); }, TypeError);
  t.throws(function() { new IterableRange(true, 1); }, TypeError);

  t.throws(function() { new IterableRange(1, '1'); }, TypeError);
  t.throws(function() { new IterableRange(1, null); }, TypeError);
  t.throws(function() { new IterableRange(1, [1]); }, TypeError);
  t.throws(function() { new IterableRange(1, true); }, TypeError);

});

