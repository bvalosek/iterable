var Iterable      = require('../lib/Iterable.js');
var Iterator      = require('../lib/Iterator.js');
var IterableArray = require('../lib/IterableArray.js');

module.exports = {

  /**
   * @param {Iterable} i
   * @param {array} a
   * @return {bool}
   */
  iterableEqualArray: function (i, a)
  {
    var iter = i.iterator();
    a.forEach(function(x, index) {
      var n = iter.next();
      if (n.done !== false)
        return false;
      if (n.value !== a[index])
        return false;
    });

    var last = iter.next();
    if (last.done !== true || last.value !== undefined)
      return false;

    return true;
  },

  /**
   * @return {Iterable}
   */
  empty: function()
  {
    return new IterableArray([]);
  },

  /**
   * @return {Iterable}
   */
  throwingIterable: function()
  {
    return {
      iterator: function() {
        return {
          next: function() {
            throw 'oops';
          }
        };
      }
    };
  },

  /**
   * @param {any} x
   * @return {any}
   */
  identity: function(x) { return x; },

  /**
   * Returns true if an instance implements the iterable/iterator interface
   * @param {Iterable} i
   * @return {bool}
   */
  implementsIterable: function(i)
  {
    return Iterable.isIterable(i) && Iterator.isIterator(i.iterator());
  },

  /**
   * @param {array} a
   * @return {Iterable}
   */
  fromArray: function(a)
  {
    return new IterableArray(a);
  }

};
