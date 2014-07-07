var test            = require('tape');
var util            = require('../util.js');
var identity        = util.identity;
var GroupByIterable = require('../../lib/iterables/GroupByIterable.js');

test('iterable interface', function(t) {
  t.plan(1);
  var g = new GroupByIterable(util.empty(), util.identity);
  t.ok(util.implementsIterable(g));
});

test('key selector', function(t) {
  t.plan(1);
  var input = util.fromArray(['abc', 'hello', 'def', 'there', 'four']);
  var g = new GroupByIterable(input, function(x) { return x.length; });
  t.deepEqual(util.toObject(g), {
    '3': ['abc', 'def'],
    '4': ['four'],
    '5': ['hello', 'there']
  });
});

test('element selector', function(t) {
  t.plan(1);
  var input = util.fromArray(['abc', 'hello', 'def', 'there', 'four']);
  var g = new GroupByIterable(
      input,
      function(x) { return x.length; },
      function(x) { return x[0]; }
    );
  t.deepEqual(util.toObject(g), {
    '3': ['a', 'd'],
    '4': ['f'],
    '5': ['h', 't']
  });
});

test('elements are iterable', function(t) {
  t.plan(6);
  var input = util.fromArray(['abc', 'hello', 'def', 'there', 'four']);
  var g = new GroupByIterable(input, function(x) { return x.length; });
  var iter = g.iterator();
  for (var n; !(n = iter.next()).done; ) {
    var group = n.value;
    t.ok(group.key !== undefined);
    t.ok(util.implementsIterable(group));
  }
});

test('param validation', function(t) {
  t.plan(3);
  t.throws(function() { new GroupByIterable(null, identity); }, TypeError);
  t.throws(function() { new GroupByIterable(util.empty(), 'shit'); }, TypeError);
  t.throws(function() { new GroupByIterable(util.empty(), identity, 'shit'); },
    TypeError);
});
