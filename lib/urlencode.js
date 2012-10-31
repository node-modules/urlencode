/*!
 * urlencode - lib/urlencode.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var iconv = require('iconv-lite');

function encode(str, charset) {
  if (charset === 'utf8' || charset === 'utf-8') {
    charset = null;
  }
  if (!charset) {
    return encodeURIComponent(str);
  }
  var buf = iconv.encode(str, charset);
  var encodeStr = '';
  for (var i = 0; i < buf.length; i++) {
    encodeStr += '%' + buf[i].toString('16').toUpperCase();
  }
  return encodeStr;
}

module.exports = encode;