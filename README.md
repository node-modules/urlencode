# urlencode

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/node-modules/urlencode/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/urllib/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/urlencode.svg?style=flat-square
[npm-url]: https://npmjs.org/package/urlencode
[codecov-image]: https://codecov.io/gh/node-modules/urlencode/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/urlencode
[snyk-image]: https://snyk.io/test/npm/urlencode/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/urlencode
[download-image]: https://img.shields.io/npm/dm/urlencode.svg?style=flat-square
[download-url]: https://npmjs.org/package/urlencode

encodeURIComponent with charset, e.g.: `gbk`

## Install

```bash
npm install urlencode
```

## Usage

```ts
import { encode, decode, parse, stringify } from 'urlencode';

console.log(encode('苏千')); // default is utf8
console.log(encode('苏千', 'gbk')); // '%CB%D5%C7%A7'

// decode gbk
decode('%CB%D5%C7%A7', 'gbk'); // '苏千'

// parse gbk querystring
parse('nick=%CB%D5%C7%A7', { charset: 'gbk' }); // {nick: '苏千'}

// stringify obj with gbk encoding
var str = 'x[y][0][v][w]=' + encode('雾空', 'gbk'); // x[y][0][v][w]=%CE%ED%BF%D5
var obj =  {'x' : {'y' : [{'v' : {'w' : '雾空'}}]}};
assert.equal(urlencode.stringify(obj, { charset: 'gbk' }, str);
```

## Benchmark

### encode(str, encoding)

```bash
$ node benchmark/urlencode.cjs

node version: v21.1.0
"苏千测试\n, 哈哈, haha"

  urlencode Benchmark
  node version: v21.1.0, date: Sat Oct 28 2023 21:01:00 GMT+0800 (中国标准时间)
  Starting...
  4 tests completed.

  urlencode(str)          x 4,617,242 ops/sec ±2.60% (95 runs sampled)
  urlencode(str, "gbk")   x 1,122,430 ops/sec ±2.20% (95 runs sampled)
  encodeURIComponent(str) x 4,608,523 ops/sec ±2.94% (93 runs sampled)
  encodeUTF8(str)         x   833,170 ops/sec ±1.37% (96 runs sampled)

node version: v20.9.0
"苏千测试\n, 哈哈, haha"

  urlencode Benchmark
  node version: v20.9.0, date: Sat Oct 28 2023 21:01:37 GMT+0800 (中国标准时间)
  Starting...
  4 tests completed.

  urlencode(str)          x 4,304,468 ops/sec ±2.83% (89 runs sampled)
  urlencode(str, "gbk")   x 1,005,759 ops/sec ±2.10% (90 runs sampled)
  encodeURIComponent(str) x 4,289,880 ops/sec ±2.99% (92 runs sampled)
  encodeUTF8(str)         x   827,841 ops/sec ±1.06% (96 runs sampled)

node version: v18.18.0
"苏千测试\n, 哈哈, haha"

  urlencode Benchmark
  node version: v18.18.0, date: Sat Oct 28 2023 19:34:06 GMT+0800 (中国标准时间)
  Starting...
  4 tests completed.

  urlencode(str)          x 4,597,865 ops/sec ±0.22% (96 runs sampled)
  urlencode(str, "gbk")   x   633,620 ops/sec ±15.31% (71 runs sampled)
  encodeURIComponent(str) x 3,902,229 ops/sec ±2.49% (87 runs sampled)
  encodeUTF8(str)         x   510,456 ops/sec ±26.76% (88 runs sampled)

node version: v16.20.2
"苏千测试\n, 哈哈, haha"

  urlencode Benchmark
  node version: v16.20.2, date: Sat Oct 28 2023 21:02:11 GMT+0800 (中国标准时间)
  Starting...
  4 tests completed.

  urlencode(str)          x 4,438,372 ops/sec ±1.80% (93 runs sampled)
  urlencode(str, "gbk")   x 1,175,761 ops/sec ±0.68% (95 runs sampled)
  encodeURIComponent(str) x 4,374,525 ops/sec ±1.96% (97 runs sampled)
  encodeUTF8(str)         x   751,616 ops/sec ±2.49% (86 runs sampled)

```

### decode(str, encoding)

```bash
$ node benchmark/urlencode.decode.cjs

node version: v21.1.0, date: "2023-10-28T12:51:20.191Z"

  urlencode.decode Benchmark
  node version: v21.1.0, date: Sat Oct 28 2023 20:51:20 GMT+0800 (中国标准时间)
  Starting...
  7 tests completed.

  urlencode.decode(str)                        x 515,410 ops/sec ±1.95% (91 runs sampled)
  urlencode.decode(str, "gbk")                 x  54,018 ops/sec ±3.17% (78 runs sampled)
  decodeURIComponent(str)                      x 313,204 ops/sec ±2.93% (78 runs sampled)
  urlencode.parse(qs, {charset: "gbk"})        x 311,613 ops/sec ±1.26% (95 runs sampled)
  urlencode.stringify(data, {charset: "gbk"})  x 316,558 ops/sec ±1.55% (93 runs sampled)
  urlencode.parse(qs, {charset: "utf8"})       x 490,744 ops/sec ±1.25% (94 runs sampled)
  urlencode.stringify(data, {charset: "utf8"}) x 357,206 ops/sec ±0.46% (97 runs sampled)

node version: v20.9.0, date: "2023-10-28T12:49:57.236Z"

  urlencode.decode Benchmark
  node version: v20.9.0, date: Sat Oct 28 2023 20:49:57 GMT+0800 (中国标准时间)
  Starting...
  7 tests completed.

  urlencode.decode(str)                        x 573,899 ops/sec ±0.62% (95 runs sampled)
  urlencode.decode(str, "gbk")                 x  83,184 ops/sec ±0.13% (100 runs sampled)
  decodeURIComponent(str)                      x 573,371 ops/sec ±1.67% (93 runs sampled)
  urlencode.parse(qs, {charset: "gbk"})        x 303,202 ops/sec ±0.70% (100 runs sampled)
  urlencode.stringify(data, {charset: "gbk"})  x 319,546 ops/sec ±0.29% (99 runs sampled)
  urlencode.parse(qs, {charset: "utf8"})       x 462,578 ops/sec ±0.25% (98 runs sampled)
  urlencode.stringify(data, {charset: "utf8"}) x 343,487 ops/sec ±0.17% (100 runs sampled)

node version: v18.18.0, date: "2023-10-28T12:44:56.355Z"

  urlencode.decode Benchmark
  node version: v18.18.0, date: Sat Oct 28 2023 20:44:56 GMT+0800 (中国标准时间)
  Starting...
  7 tests completed.

  urlencode.decode(str)                        x 550,451 ops/sec ±1.74% (98 runs sampled)
  urlencode.decode(str, "gbk")                 x  67,311 ops/sec ±1.16% (96 runs sampled)
  decodeURIComponent(str)                      x 569,461 ops/sec ±0.30% (93 runs sampled)
  urlencode.parse(qs, {charset: "gbk"})        x 293,407 ops/sec ±0.90% (97 runs sampled)
  urlencode.stringify(data, {charset: "gbk"})  x 234,162 ops/sec ±4.55% (75 runs sampled)
  urlencode.parse(qs, {charset: "utf8"})       x 316,697 ops/sec ±4.37% (78 runs sampled)
  urlencode.stringify(data, {charset: "utf8"}) x 192,787 ops/sec ±4.58% (80 runs sampled)

node version: v16.20.2, date: "2023-10-28T12:47:38.431Z"

  urlencode.decode Benchmark
  node version: v16.20.2, date: Sat Oct 28 2023 20:47:38 GMT+0800 (中国标准时间)
  Starting...
  7 tests completed.

  urlencode.decode(str)                        x 537,995 ops/sec ±2.07% (96 runs sampled)
  urlencode.decode(str, "gbk")                 x  78,073 ops/sec ±0.17% (99 runs sampled)
  decodeURIComponent(str)                      x 558,509 ops/sec ±0.48% (96 runs sampled)
  urlencode.parse(qs, {charset: "gbk"})        x 252,590 ops/sec ±2.87% (90 runs sampled)
  urlencode.stringify(data, {charset: "gbk"})  x 287,978 ops/sec ±2.47% (92 runs sampled)
  urlencode.parse(qs, {charset: "utf8"})       x 416,600 ops/sec ±0.72% (93 runs sampled)
  urlencode.stringify(data, {charset: "utf8"}) x 281,319 ops/sec ±2.43% (85 runs sampled)

```

## License

[MIT](LICENSE.txt)
