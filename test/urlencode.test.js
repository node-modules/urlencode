/*!
 * urlencode - test/urlencode.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var urlencode = require('../');
var should = require('should');

describe('urlencode.test.js', function () {
  var items = [
    [ '苏千', null, encodeURIComponent('苏千') ],
    [ '苏千', undefined, encodeURIComponent('苏千') ],
    [ '苏千', '', encodeURIComponent('苏千') ],
    [ '苏千', 'utf8', encodeURIComponent('苏千') ],
    [ '苏千', 'utf-8', encodeURIComponent('苏千') ],
    [ 'nodeJS', 'gbk', '%6E%6F%64%65%4A%53' ],
    [ '苏千', 'gbk', '%CB%D5%C7%A7' ],
    [ '苏千，nodejs。！@#￥%……&**（&*）&）}{|~~！@+——？、》《。，“‘：；|、】【}{~·中文', 'gbk', 
      '%CB%D5%C7%A7%A3%AC%6E%6F%64%65%6A%73%A1%A3%A3%A1%40%23%A3%A4%25%A1%AD%A1%AD%26%2A%2A%A3%A8%26%2A%A3%A9%26%A3%A9%7D%7B%7C%7E%7E%A3%A1%40%2B%A1%AA%A1%AA%A3%BF%A1%A2%A1%B7%A1%B6%A1%A3%A3%AC%A1%B0%A1%AE%A3%BA%A3%BB%7C%A1%A2%A1%BF%A1%BE%7D%7B%7E%A1%A4%D6%D0%CE%C4' ],
  ];

  items.forEach(function (item) {
    var str = item[0];
    var charset = item[1];
    var expect = item[2];
    it('should enocde ' + str.substring(0, 20) + ' with ' + charset + ' to ' + expect.substring(0, 30), function () {
      // console.log(urlencode(str, charset))
      urlencode(str, charset).should.equal(expect);
    });
  });
});
