var Iterable      = require('../lib/Iterable.js');
var Iterator      = require('../lib/Iterator.js');
var IterableArray = require('../lib/iterables/factories/IterableArray.js');

module.exports = {

  /**
   * @param {Iterable} i
   * @param {array} a
   * @return {bool}
   */
  iterableEqualArray: function (i, a)
  {
    var iter = i.iterator();
    for (var x = 0; x < a.length; x++) {
      var n = iter.next();
      if (n.done !== false)
        return false;
      if (n.value !== a[x])
        return false;
    }

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
   * @param {Iterable} iterable
   * @return {array.<any>}
   */
  toArray: function(iterable)
  {
    var ret = [];
    var iter = iterable.iterator();
    for (var n; !(n = iter.next()).done; ) {
      var item = n.value;
      ret.push(item);
    }
    return ret;
  },

  /**
   * @param {Iterable} iterable
   * @return {object.<string>}
   */
  toObject: function(iterable)
  {
    var ret = {};
    var iter = iterable.iterator();
    for (var n; !(n = iter.next()).done; ) {
      var item = n.value;
      ret[item.key] = this.toArray(item);
    }
    return ret;
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
