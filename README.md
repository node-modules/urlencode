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
```

### decode(str, encoding)

```bash
$ node benchmark/urlencode.decode.cjs

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
```

## License

[MIT](LICENSE.txt)
