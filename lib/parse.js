"use strict";

var decode = require('./index').decode;

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length === 0) {
    return parent[key] = {};
  }
  var t = {};
  for (var i in parent[key]) {
    if (parent[key].hasOwnProperty(i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();

  // illegal
  if (Object.hasOwnProperty.call(Object.prototype, key)) {
    return;
  }

  // end
  if (!part) {
    if (Array.isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' === typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' === typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' === part) {
      if (Array.isArray(obj)) {
        if ('' !== val) {
          obj.push(val);
        }
      } else if ('object' === typeof obj) {
        obj[Object.keys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~part.indexOf(']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && Array.isArray(obj)) {
        obj = promote(parent, key);
      }
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && Array.isArray(obj)) {
        obj = promote(parent, key);
      }
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~key.indexOf(']')) {
    var parts = key.split('[');
    var len = parts.length;
    var last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && Array.isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) {
        t[k] = parent.base[k];
      }
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' !== typeof obj) {return obj;}

  if (Array.isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  Object.keys(obj).forEach(function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str, options){
  var ret = String(str).split('&').reduce(function(ret, pair){
    var eql = pair.indexOf('=');
    var brace = lastBraceInKey(pair);
    var key = pair.substr(0, brace || eql);
    var val = pair.substr(brace || eql, pair.length);
    val = val.substr(val.indexOf('=') + 1, val.length);

    // ?foo
    if ('' === key) {key = pair, val = '';}
    if ('' === key) {return ret;}

    var charset = options.charset;
    return merge(ret, decode(key), decode(val, charset));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (Object.hasOwnProperty.call(Object.prototype, key)) {return;}
  if (undefined === v) {
    obj[key] = val;
  } else if (Array.isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length;
  var brace;
  var c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' === c) {brace = false;}
    if ('[' === c) {brace = true;}
    if ('=' === c && !brace) {return i;}
  }
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

module.exports = function(str, options){
  if (null === str || '' === str) {return {};}
  if (!options) {options = {};}
  return 'object' === typeof str
    ? parseObject(str)
    : parseString(str, options);
};