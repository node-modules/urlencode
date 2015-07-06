/*!
 * urlencode - benchmark/urlencode.js
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var urlencode = require('../');

console.log('node version: %s', process.version);

function encodeUTF8(str) {
  var encodeStr = '';
  var buf = new Buffer(str);
  var ch = '';
  for (var i = 0; i < buf.length; i++) {
    ch = buf[i].toString('16');
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += '%' + ch;
  }
  return encodeStr.toUpperCase();
}

console.log('%j', decodeURIComponent(encodeUTF8('苏千测试\n, 哈哈, haha')));

var suite = new Benchmark.Suite();

suite

.add('urlencode(str)', function () {
  // urlencode('苏千');
  urlencode('苏千写的\nurlencode，应该有用');
  // urlencode('suqian want to sleep early tonight.');
  // urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

.add('urlencode(str, "gbk")', function () {
  // urlencode('苏千', 'gbk');
  urlencode('苏千写的\nurlencode，应该有用', 'gbk');
  // urlencode('suqian want to sleep early tonight.', 'gbk');
  // urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢', 'gbk');
})

.add('encodeURIComponent(str)', function () {
  // encodeURIComponent('苏千');
  encodeURIComponent('苏千写的\nurlencode，应该有用');
  // encodeURIComponent('suqian want to sleep early tonight.');
  // encodeURIComponent('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

.add('encodeUTF8(str)', function () {
  // encodeUTF8('苏千');
  encodeUTF8('苏千写的\nurlencode，应该有用');
  // encodeUTF8('suqian want to sleep early tonight.');
  // encodeUTF8('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  urlencode Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// $ node benchmark/urlencode.js
//
// node version: v0.11.12
//
//   urlencode Benchmark
//   node version: v0.11.12, date: Sat Aug 23 2014 23:15:27 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   urlencode(str)          x 427,364 ops/sec ±3.46% (93 runs sampled)
//   urlencode(str, "gbk")   x  80,073 ops/sec ±1.92% (91 runs sampled)
//   encodeURIComponent(str) x 453,495 ops/sec ±0.78% (97 runs sampled)
//   encodeUTF8(str)         x 117,744 ops/sec ±0.83% (100 runs sampled)

// $ node benchmark/urlencode.js
//
// node version: v0.11.14
// 苏千测试, 哈哈, haha
//
//   urlencode Benchmark
//   node version: v0.11.14, date: Fri Sep 26 2014 10:50:01 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   urlencode(str)          x 378,559 ops/sec ±4.10% (85 runs sampled)
//   urlencode(str, "gbk")   x 104,806 ops/sec ±3.64% (85 runs sampled)
//   encodeURIComponent(str) x 328,671 ops/sec ±5.99% (76 runs sampled)
//   encodeUTF8(str)         x  75,077 ops/sec ±6.34% (77 runs sampled)
