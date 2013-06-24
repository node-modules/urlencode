urlencode [![Build Status](https://secure.travis-ci.org/fengmk2/urlencode.png)](http://travis-ci.org/fengmk2/urlencode) [![Coverage Status](https://coveralls.io/repos/fengmk2/urlencode/badge.png)](https://coveralls.io/r/fengmk2/urlencode)
=======

![logo](https://raw.github.com/fengmk2/urlencode/master/logo.png)

encodeURIComponent with charset.

jscoverage: [100%](http://fengmk2.github.com/coverage/urlencode.html)

## Install

```bash
$ npm install urlencode
```

## Usage

```js
var urlencode = require('urlencode');

console.log(urlencode('苏千')); // default is utf8
console.log(urlencode('苏千', 'gbk'));
```

## Benchmark

```bash
$ make benchmark
urlencode(str) x 11,931 ops/sec ±0.85% (89 runs sampled)
urlencode(str, "gbk") x 7,516 ops/sec ±2.67% (90 runs sampled)
encodeURIComponent(str) x 11,723 ops/sec ±3.93% (91 runs sampled)
Fastest is urlencode(str),encodeURIComponent(str)
```

## License 

(The MIT License)

Copyright (c) 2012 - 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
