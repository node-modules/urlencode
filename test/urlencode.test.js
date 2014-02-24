/*!
 * urlencode - test/urlencode.test.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var urlencode = require('../');
var should = require('should');

describe('urlencode.test.js', function () {
  describe('encode() and decode()', function () {
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
      [ '\\诚%http://github.com/aleafs?a=b&c[1]= &c2#', 'gbk', '%5C%B3%CF%25%68%74%74%70%3A%2F%2F%67%69%74%68%75%62%2E%63%6F%6D%2F%61%6C%65%61%66%73%3F%61%3D%62%26%63%5B%31%5D%3D%20%26%63%32%23']
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

    var decodeItems = [
      [ '%CB%D5%C7%A7a', 'gbk', '苏千a' ],
      [
        '%CB%D5%C7%A7%A3%ACnodejs%A1%A3%A3%A1%40%23%A3%A4%25%A1%AD%A1%AD%26**%A3%A8%26*%A3%A9%26%A3%A9%7D%7B%7C%7E%7E%A3%A1%40%2B%A1%AA%A1%AA%A3%BF%A1%A2%A1%B7%A1%B6%A1%A3%A3%AC%A1%B0%A1%AE%A3%BA%A3%BB%7C%A1%A2%A1%BF%A1%BE%7D%7B%7E%A1%A4%D6%D0%CE%C4',
        'gbk',
        '苏千，nodejs。！@#￥%……&**（&*）&）}{|~~！@+——？、》《。，“‘：；|、】【}{~·中文'
      ],
    ];

    decodeItems.forEach(function (item) {
      var str = item[0];
      var charset = item[1];
      var expect = item[2];
      it('should decode ' + str.substring(0, 20) + ' with ' + charset + ' to ' + expect.substring(0, 30), function () {
        urlencode.decode(str, charset).should.equal(expect);
      });
    });

    items.forEach(function (item) {
      var str = item[2];
      var charset = item[1];
      var expect = item[0];
      it('should decode ' + str.substring(0, 20) + ' with ' + charset + ' to ' + expect.substring(0, 30), function () {
        urlencode.decode(str, charset).should.equal(expect);
      });
    });
  });

  describe('parse()', function () {
    it('should work with gbk encoding', function () {
      var qs = 'umidtoken=Tc230acc03a564530aee31d22701e9b95&usertag4=0&usertag3=512&usertag2=0&status=0&userid=665377421&out_user=suqian.yf%40taobao.com&promotedtype=0&account_no=20885028063394350156&loginstatus=true&usertag=0&nick=%CB%D5%C7%A7&tairlastupdatetime=1319008872&strid=a68f6ee38f44d2b89ca508444c1ccaf9';
      var obj = urlencode.parse(qs, {charset: 'gbk'});
      obj.should.eql({
        umidtoken: 'Tc230acc03a564530aee31d22701e9b95',
        usertag4: '0',
        usertag3: '512',
        usertag2: '0',
        status: '0',
        userid: '665377421',
        out_user: 'suqian.yf@taobao.com',
        promotedtype: '0',
        account_no: '20885028063394350156',
        loginstatus: 'true',
        usertag: '0',
        nick: '苏千',
        tairlastupdatetime: '1319008872',
        strid: 'a68f6ee38f44d2b89ca508444c1ccaf9'
      });
    });
  });
});
