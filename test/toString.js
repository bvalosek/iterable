var test     = require('tape');
var util     = require('./util.js');
var Sequence = require('../lib/Sequence.js');

test('Compare works, no join', function(t) {
  t.plan(1);
  var source = 'hello';
  var s = Sequence.from(source).toString();
  t.strictEqual(s, source);
});

test('With a seperator', function(t) {
  t.plan(1);
  var s = Sequence.from('hey').toString(' ');
  t.strictEqual(s, 'h e y');
});
