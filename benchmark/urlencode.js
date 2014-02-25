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
var urlencode = require('../');

console.log('node version: %s', process.version);

var suite = new Benchmark.Suite();

suite

.add('urlencode(str)', function () {
  urlencode('苏千');
  urlencode('苏千写的urlencode，应该有用');
  urlencode('suqian want to sleep early tonight.');
  urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

.add('urlencode(str, "gbk")', function () {
  urlencode('苏千', 'gbk');
  urlencode('苏千写的urlencode，应该有用', 'gbk');
  urlencode('suqian want to sleep early tonight.', 'gbk');
  urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢', 'gbk');
})

.add('encodeURIComponent(str)', function () {
  encodeURIComponent('苏千');
  encodeURIComponent('苏千写的urlencode，应该有用');
  encodeURIComponent('suqian want to sleep early tonight.');
  encodeURIComponent('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();

