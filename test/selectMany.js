var test               = require('tape');
var util               = require('./util.js');
var SelectManyIterable = require('../lib/SelectManyIterable.js');

test('Flatten with proj and index', function(t) {
  t.plan(1);

  var numbers = [3, 5, 20, 15];

  // skeet style
  var sm = new SelectManyIterable(util.fromArray(numbers),
    function(x, index) { return (x + index).toString(); },
    function(x, c) { return x + ': ' + c.toString(); });

  t.ok(util.iterableEqualArray(sm, [
    '3: 3',
    '5: 6',
    '20: 2', '20: 2',
    '15: 1', '15: 8'
  ]));

});

test('Param validation', function(t) {
  t.plan(3);

  t.throws(
    function() { new SelectManyIterable(util.empty(), 'garbage'); }, TypeError);
  t.throws(
    function() { new SelectManyIterable(util.empty(), util.identity, 'garbage'); }, TypeError);
  t.throws(
    function() { new SelectManyIterable(util.empty(), 'garbage', util.identity); }, TypeError);

});
