var test          = require('tape');
var util          = require('../util.js');
var LimitIterable = require('../../lib/iterables/LimitIterable.js');

test('param validation', function(t) {
  t.plan(7);
  var input = util.empty();
  t.throws(function() { new LimitIterable('shit'); }, TypeError);
  t.throws(function() { new LimitIterable(input, 'shit'); }, TypeError);
  t.throws(function() { new LimitIterable(input, null); }, TypeError);
  t.throws(function() { new LimitIterable(input, false); }, TypeError);
  t.throws(function() { new LimitIterable(input, 1, 'shit'); }, TypeError);
  t.throws(function() { new LimitIterable(input, 1, null); }, TypeError);
  t.throws(function() { new LimitIterable(input, 1, false); }, TypeError);
});

test('bad numbers', function(t) {
  t.plan(2);
  var input = util.empty();
  t.throws(function() { new LimitIterable(input, -1); }, RangeError);
  t.throws(function() { new LimitIterable(input, 0, -1); }, RangeError);
});

test('basic', function(t) {
  t.plan(1);
  var input = util.fromArray([1,2,3,4,5,6]);
  var i = new LimitIterable(input, 2, 3);
  t.ok(util.iterableEqualArray(i, [3,4,5]));
});

test('nop', function(t) {
  t.plan(1);
  var input = util.fromArray([1,2,3]);
  t.ok(util.iterableEqualArray(new LimitIterable(input), [1,2,3]));
});

test('skip stuff', function(t) {
  t.plan(2);
  var input = util.fromArray([1,2,3]);
  var i = new LimitIterable(input, 100);
  t.ok(util.iterableEqualArray(i, []));
  i = new LimitIterable(input, 0);
  t.ok(util.iterableEqualArray(i, [1,2,3]));
});

test('take stuff', function(t) {
  t.plan(2);
  var input = util.fromArray([1,2,3]);
  var i = new LimitIterable(input, 0, 100);
  t.ok(util.iterableEqualArray(i, [1,2,3]));

  i = new LimitIterable(input, 0, 0);
  console.log(util.toArray(i));
  t.ok(util.iterableEqualArray(i, []));
});


