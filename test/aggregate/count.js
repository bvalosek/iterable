var test     = require('tape');
var util     = require('../util.js');
var Sequence = require('../../lib/Sequence.js');


test('0 count', function(t) {
  t.plan(1);
  t.strictEqual(Sequence.from([]).count(), 0);
});

test('not 0 count', function(t) {
  t.plan(1);
  t.strictEqual(Sequence.from([1,2,3]).count(), 3);
});
