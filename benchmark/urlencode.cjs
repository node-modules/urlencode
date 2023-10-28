const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const { encode } = require('../');

console.log('node version: %s', process.version);

function encodeUTF8(str) {
  let encodeStr = '';
  const buf = Buffer.from(str);
  let ch = '';
  for (let i = 0; i < buf.length; i++) {
    ch = buf[i].toString('16');
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += '%' + ch;
  }
  return encodeStr.toUpperCase();
}

console.log('%j', decodeURIComponent(encodeUTF8('苏千测试\n, 哈哈, haha')));

const suite = new Benchmark.Suite();

suite

.add('urlencode(str)', function () {
  // urlencode('苏千');
  encode('苏千写的\nurlencode，应该有用');
  // urlencode('suqian want to sleep early tonight.');
  // urlencode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢');
})

.add('urlencode(str, "gbk")', function () {
  // urlencode('苏千', 'gbk');
  encode('苏千写的\nurlencode，应该有用', 'gbk');
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
