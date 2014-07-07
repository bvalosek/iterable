var test            = require('tape');
var util            = require('../util.js');
var ReverseIterable = require('../../lib/iterables/ReverseIterable.js');

test('param validation', function(t) {
  t.plan(3);
  t.throws(function() { new ReverseIterable('shit'); }, TypeError);
  t.throws(function() { new ReverseIterable(); }, TypeError);
  t.throws(function() { new ReverseIterable([]); }, TypeError);
});

test('it reverses', function(t) {
  t.plan(1);
  var input = util.fromArray([1,2,3]);
  var r = new ReverseIterable(input);
  t.ok(util.iterableEqualArray(r, [3,2,1]));
});

test('empty', function(t) {
  t.plan(1);
  var r = new ReverseIterable(util.empty());
  t.ok(util.iterableEqualArray(r, []));
});
