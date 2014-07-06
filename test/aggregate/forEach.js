var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');

test('param validation', function(t) {
  t.plan(3);
  t.throws(function() { Sequence.from([]).forEach(); });
  t.throws(function() { Sequence.from([]).forEach(''); });
  t.throws(function() { Sequence.from([]).forEach(null); });
});

test('fired and with index', function(t) {
  t.plan(3);
  Sequence.from([0,1,2]).forEach(function(x, index) {
    t.strictEqual(x, index);
  });
});
