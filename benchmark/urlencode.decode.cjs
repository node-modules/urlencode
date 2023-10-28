const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const { parse, encode, decode, stringify } = require('../');

console.log('node version: %s, date: %j', process.version, new Date());

const suite = new Benchmark.Suite();

const utf8DecodeItems = [
  encode('苏千'),
  encode('苏千写的urlencode，应该有用'),
  encode('suqian want to sleep early tonight.'),
  encode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢'),
];

const gbkDecodeItems = [
  encode('苏千', 'gbk'),
  encode('苏千写的urlencode，应该有用', 'gbk'),
  encode('suqian want to sleep early tonight.', 'gbk'),
  encode('你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢,你让同一个项目中写两份一样代码的人情何以堪呢', 'gbk'),
];

// console.log(decode(gbkDecodeItems[3], 'gbk'))

const gbkEncodeString = 'umidtoken=Tc230acc03a564530aee31d22701e9b95&usertag4=0&usertag3=512&usertag2=0&status=0&userid=665377421&out_user=suqian.yf%40taobao.com&promotedtype=0&account_no=20885028063394350156&loginstatus=true&usertag=0&nick=%CB%D5%C7%A7&tairlastupdatetime=1319008872&strid=a68f6ee38f44d2b89ca508444c1ccaf9';
const data = parse(gbkEncodeString, {charset: 'gbk'});

// console.log(stringify(data, {charset: 'gbk'}) === gbkEncodeString);

suite

.add('urlencode.decode(str)', function () {
  decode(utf8DecodeItems[0]);
  decode(utf8DecodeItems[1]);
  decode(utf8DecodeItems[2]);
  decode(utf8DecodeItems[3]);
})

.add('urlencode.decode(str, "gbk")', function () {
  decode(gbkDecodeItems[0], 'gbk');
  decode(gbkDecodeItems[1], 'gbk');
  decode(gbkDecodeItems[2], 'gbk');
  decode(gbkDecodeItems[3], 'gbk');
})

.add('decodeURIComponent(str)', function () {
  decodeURIComponent(utf8DecodeItems[0]);
  decodeURIComponent(utf8DecodeItems[1]);
  decodeURIComponent(utf8DecodeItems[2]);
  decodeURIComponent(utf8DecodeItems[3]);
})

.add('urlencode.parse(qs, {charset: "gbk"})', function () {
  parse(gbkEncodeString, {charset: 'gbk'});
})

.add('urlencode.stringify(data, {charset: "gbk"})', function () {
  stringify(data, {charset: 'gbk'});
})

.add('urlencode.parse(qs, {charset: "utf8"})', function () {
  parse('umidtoken=Tc230acc03a564530aee31d22701e9b95&usertag4=0&usertag3=512&usertag2=0&status=0&userid=665377421&out_user=suqian.yf%40taobao.com&promotedtype=0&account_no=20885028063394350156&loginstatus=true&usertag=0&nick=%E8%8B%8F%E5%8D%83&tairlastupdatetime=1319008872&strid=a68f6ee38f44d2b89ca508444c1ccaf9',
    {charset: 'utf8'});
})

.add('urlencode.stringify(data, {charset: "utf8"})', function () {
  stringify(data, {charset: 'utf8'});
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  urlencode.decode Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });
