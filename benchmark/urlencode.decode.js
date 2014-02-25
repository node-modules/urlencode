/**!
 * urlencode - benchmark/urlencode.decode.js
 *
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var urlencode = require('../');

console.log('node version: %s', process.version);

var suite = new Benchmark.Suite();

var utf8DecodeItems = [
  urlencode('苏千'),
  urlencode('苏千写的urlencode，应该有用'),
  urlencode('suqian want to sleep early tonight.'),
  urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢'),
];

var gbkDecodeItems = [
  urlencode('苏千', 'gbk'),
  urlencode('苏千写的urlencode，应该有用', 'gbk'),
  urlencode('suqian want to sleep early tonight.', 'gbk'),
  urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢', 'gbk'),
];

// console.log(urlencode.decode(gbkDecodeItems[3], 'gbk'))

suite

.add('urlencode.decode(str)', function () {
  urlencode.decode(utf8DecodeItems[0]);
  urlencode.decode(utf8DecodeItems[1]);
  urlencode.decode(utf8DecodeItems[2]);
  urlencode.decode(utf8DecodeItems[3]);
})

.add('urlencode.decode(str, "gbk")', function () {
  urlencode.decode(gbkDecodeItems[0], 'gbk');
  urlencode.decode(gbkDecodeItems[1], 'gbk');
  urlencode.decode(gbkDecodeItems[2], 'gbk');
  urlencode.decode(gbkDecodeItems[3], 'gbk');
})

.add('decodeURIComponent(str)', function () {
  decodeURIComponent(utf8DecodeItems[0]);
  decodeURIComponent(utf8DecodeItems[1]);
  decodeURIComponent(utf8DecodeItems[2]);
  decodeURIComponent(utf8DecodeItems[3]);
})

.add('urlencode.parse(qs, {charset: "gbk"})', function () {
  urlencode.parse('umidtoken=Tc230acc03a564530aee31d22701e9b95&usertag4=0&usertag3=512&usertag2=0&status=0&userid=665377421&out_user=suqian.yf%40taobao.com&promotedtype=0&account_no=20885028063394350156&loginstatus=true&usertag=0&nick=%CB%D5%C7%A7&tairlastupdatetime=1319008872&strid=a68f6ee38f44d2b89ca508444c1ccaf9',
    {charset: 'gbk'});
})

.add('urlencode.parse(qs, {charset: "utf8"})', function () {
  urlencode.parse('umidtoken=Tc230acc03a564530aee31d22701e9b95&usertag4=0&usertag3=512&usertag2=0&status=0&userid=665377421&out_user=suqian.yf%40taobao.com&promotedtype=0&account_no=20885028063394350156&loginstatus=true&usertag=0&nick=%E8%8B%8F%E5%8D%83&tairlastupdatetime=1319008872&strid=a68f6ee38f44d2b89ca508444c1ccaf9',
    {charset: 'utf8'});
})

// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();

