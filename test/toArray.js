var test     = require('tape');
var util     = require('./util.js');
var Sequence = require('../lib/Sequence.js');

test('Decoupled', function(t) {
  t.plan(1);
  var source = [1,2,3];
  var a = Sequence.from(source).toArray();
  a.push(4);
  t.deepEqual(source, [1,2,3]);
});
