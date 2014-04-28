"use strict";

var encode = require('./index').encode;

function isASCII(str) {
  return (/^[\x00-\x7F]*$/).test(str);
}

function encodeComponent(item, charset) {
  item = String(item);
  if (isASCII(item)) {
    item = encodeURIComponent(item);
  } else {
    item = encode(item, charset);
  }
  return item;
}

var stringify = function(obj, prefix, options) {
  if (typeof prefix !== 'string') {
    options = prefix || {};
    prefix = null;
  }
  var charset = options.charset || 'utf-8';
  if (Array.isArray(obj)) {
    return stringifyArray(obj, prefix, options);
  } else if ('[object Object]' === {}.toString.call(obj)) {
    return stringifyObject(obj, prefix, options);
  } else if ('string' === typeof obj) {
    return stringifyString(obj, prefix, options);
  } else {
    return prefix + '=' + encodeComponent(String(obj), charset);
  }
};

function stringifyString(str, prefix, options) {
  if (!prefix) {
    throw new TypeError('stringify expects an object');
  }
  var charset = options.charset;
  return prefix + '=' + encodeComponent(str, charset);
}

function stringifyArray(arr, prefix, options) {
  var ret = [];
  if (!prefix) {
    throw new TypeError('stringify expects an object');
  }
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']', options));
  }
  return ret.join('&');
}

function stringifyObject(obj, prefix, options) {
  var ret = [];
  var keys = Object.keys(obj);
  var key;

  var charset = options.charset;
  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' === key) {
      continue;
    }
    if (null === obj[key]) {
      ret.push(encode(key, charset) + '=');
    } else {
      ret.push(stringify(
        obj[key],
        prefix ? prefix + '[' + encodeComponent(key, charset) + ']': encodeComponent(key, charset),
        options));
    }
  }

  return ret.join('&');
}

module.exports = stringify;