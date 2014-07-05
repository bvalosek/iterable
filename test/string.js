var test           = require('tape');
var util           = require('./util.js');
var IterableString = require('../lib/iterables/factories/IterableString.js');

test('Iterator inteface', function(t) {
  t.plan(1);
  var s = new IterableString('hello');
  t.ok(util.implementsIterable(s));
});

test('Yield string results in order', function(t) {
  t.plan(1);
  var s = new IterableString('hello');
  t.ok(util.iterableEqualArray(s, ['h','e','l','l','o']));
});

test('Empty string', function(t) {
  t.plan(1);
  var s = new IterableString('');
  t.ok(util.iterableEqualArray(s, []));
});

test('Parameter validation', function(t) {
  t.plan(6);
  t.throws(function() { new IterableString(['asdf']); }, TypeError);
  t.throws(function() { new IterableString(null); }, TypeError);
  t.throws(function() { new IterableString(undefined); }, TypeError);
  t.throws(function() { new IterableString(); }, TypeError);
  t.throws(function() { new IterableString(4); }, TypeError);
  t.throws(function() { new IterableString(true); }, TypeError);
});
