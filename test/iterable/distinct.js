var test             = require('tape');
var util             = require('../util.js');
var DistinctIterable = require('../../lib/iterables/DistinctIterable.js');

test('Default select', function(t) {
  t.plan(1);
  var d = new DistinctIterable(util.fromArray([1,2,2,3,1]));
  t.ok(util.iterableEqualArray(d, [1,2,3]));
});

test('Selector', function(t) {
  t.plan(1);
  var d = new DistinctIterable(
    util.fromArray([1.1, 1.2, 1.3,2.1,2.2]),
    function(x) { return 0|x; }
  );

  t.ok(util.iterableEqualArray(d, [1.1,2.1]));
});

test('Param validation', function(t) {
  t.plan(2);
  t.throws(function() { new DistinctIterable(util.empty, 'garbage'); });
  t.throws(function() { new DistinctIterable('gabage', util.identity); });
});
