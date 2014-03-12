var test          = require('tape');
var util          = require('./util.js');
var WhereIterable = require('../lib/WhereIterable.js');

test('Iterable interface', function(t) {
  t.plan(1);

  var where = new WhereIterable(util.empty(), util.identity);
  t.ok(util.implementsIterable(where));

});

test('Simple filtering', function(t) {
  t.plan(1);

  var source = util.fromArray([1,3,4,2,8,1]);
  var where = new WhereIterable(source, function(x) { return x < 4; });
  t.ok(util.iterableEqualArray(where, [1,3,2,1]));

});

test('Lazy eval', function(t) {
  t.plan(1);

  var where = new WhereIterable(util.throwingIterable(), util.identity);
  t.pass();

});

test('Parameter validation', function(t) {
  t.plan(6);

  t.throws(function() { new WhereIterable(null, util.identity); }, TypeError);
  t.throws(function() { new WhereIterable([1,2], util.identity); }, TypeError);
  t.throws(function() { new WhereIterable(true, util.identity); }, TypeError);

  t.throws(function() { new WhereIterable(util.empty(), null); }, TypeError);
  t.throws(function() { new WhereIterable(util.empty(), {}); }, TypeError);
  t.throws(function() { new WhereIterable(util.empty(), true); }, TypeError);

});
