var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('basic', function(t) {
  t.plan(2);
  var s = Sequence.from([1,2,3]);
  t.ok(s.contains(2));
  t.notOk(s.contains('shit'));
});

test('falsey is found', function(t) {
  t.plan(5);
  var s = Sequence.from([0, '', false, null, undefined]);
  t.ok(s.contains(null));
  t.ok(s.contains(undefined));
  t.ok(s.contains(false));
  t.ok(s.contains(0));
  t.ok(s.contains(''));
});

