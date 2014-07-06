var test              = require('tape');
var util              = require('../util.js');
var IntersectIterable = require('../../lib/iterables/IntersectIterable.js');

test('param validation', function(t) {
  t.plan(5);
  t.throws(function() { new IntersectIterable(util.empty(), null); }, TypeError);
  t.throws(function() { new IntersectIterable(null, util.empty()); }, TypeError);
  t.throws(function() { new IntersectIterable('', util.empty()); }, TypeError);
  t.throws(function() { new IntersectIterable([], util.empty()); }, TypeError);
  t.throws(function() { new IntersectIterable({}, util.empty()); }, TypeError);
});

test('basic', function(t) {
  t.plan(3);
  var e = new IntersectIterable(util.fromArray([1,2,3]), util.fromArray([2, 3]));
  t.ok(util.iterableEqualArray(e, [2,3]));
  e = new IntersectIterable(util.fromArray([1,2,3]), util.fromArray([1]));
  t.ok(util.iterableEqualArray(e, [1]));
  e = new IntersectIterable(util.fromArray([1,2,3]), util.fromArray([5,6]));
  t.ok(util.iterableEqualArray(e, []));
});

test('duplicate nums', function(t) {
  t.plan(2);
  var e = new IntersectIterable(util.fromArray([1,2,2,3]), util.fromArray([2, 3]));
  t.ok(util.iterableEqualArray(e, [2,2,3]));
  e = new IntersectIterable(util.fromArray([1,2,2,3]),
    util.fromArray([2, 3, 3]));
  t.ok(util.iterableEqualArray(e, [2,2,3]));
});

test('order', function(t) {
  t.plan(1);
  var e = new IntersectIterable(util.fromArray([3,3,1,3,1,2,1]),
    util.fromArray([1,5]));
  t.ok(util.iterableEqualArray(e, [1,1,1]));
});


