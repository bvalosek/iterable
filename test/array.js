var test          = require('tape');
var util          = require('./util.js');
var IterableArray = require('../lib/IterableArray.js');

test('Iterator inteface', function(t) {
  t.plan(1);

  var a = new IterableArray([1,2,3]);
  t.ok(util.implementsIterable(a));

});

test('Yield results in order', function(t) {
  t.plan(1);

  var source = [1,1,2,3,5,8, null, undefined, 'yah', false];
  var a = new IterableArray(source);

  t.ok(util.iterableEqualArray(a, source));

});

test('Empty array', function(t) {
  t.plan(2);

  var a = new IterableArray([]);
  var iter = a.iterator();

  t.deepEqual(iter.next(), { done: true, value: undefined });
  t.deepEqual(iter.next(), { done: true, value: undefined });

});

test('Parameter validation', function(t) {
  t.plan(6);

  t.throws(function() { new IterableArray('asdf'); }, TypeError);
  t.throws(function() { new IterableArray(null); }, TypeError);
  t.throws(function() { new IterableArray(undefined); }, TypeError);
  t.throws(function() { new IterableArray(); }, TypeError);
  t.throws(function() { new IterableArray(4); }, TypeError);
  t.throws(function() { new IterableArray(true); }, TypeError);

});
