var test     = require('tape');
var util     = require('./util.js');
var Sequence = require('../lib/Sequence.js');

test('Empty sequence', function(t) {
  t.plan(2);
  t.ok(!Sequence.from([]).any());
  t.ok(Sequence.from([]).every());
});

test('Any', function(t) {
  t.plan(1);
  t.ok(Sequence.from([1,2,3]).any());
});

test('No matching elements', function(t) {
  t.plan(2);
  var p = function(x) { return x > 10; };
  t.ok(!Sequence.from([1,2,3]).any(p));
  t.ok(!Sequence.from([1,2,3]).every(p));
});

test('Some matching elements', function(t) {
  t.plan(2);
  var p = function(x) { return x > 1; };
  t.ok(Sequence.from([1,2,3]).any(p));
  t.ok(!Sequence.from([1,2,3]).every(p));
});

test('All matching elements', function(t) {
  t.plan(2);
  var p = function(x) { return x > 0; };
  t.ok(Sequence.from([1,2,3]).any(p));
  t.ok(Sequence.from([1,2,3]).every(p));
});

test('Param validation', function(t) {
  t.plan(2);
  t.throws(function() { new Sequence().from([]).any('garbage'); }, TypeError);
  t.throws(function() { new Sequence().from([]).every('garbage'); }, TypeError);
});

