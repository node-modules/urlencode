urlencode2 [![Build Status](https://travis-ci.org/alsotang/urlencode.svg)](https://travis-ci.org/alsotang/urlencode)
=======

encodeURIComponent with charset, e.g.: `gbk`

## Install

```bash
$ npm install urlencode2
```

## Usage

```js
var urlencode = require('urlencode2');

console.log(urlencode('苏千')); // default is utf8
console.log(urlencode('苏千', 'gbk')); // '%CB%D5%C7%A7'

// decode gbk
urlencode.decode('%CB%D5%C7%A7', 'gbk'); // '苏千'

// parse gbk querystring
urlencode.parse('nick=%CB%D5%C7%A7', {charset: 'gbk'}); // {nick: '苏千'}

// stringify obj with gbk encoding
var str = 'x[y][0][v][w]=' + urlencode('雾空', 'gbk'); // x[y][0][v][w]=%CE%ED%BF%D5
var obj =  {'x' : {'y' : [{'v' : {'w' : '雾空'}}]}};
urlencode.stringify(obj, {charset: 'gbk'}).should.equal(str);

```

## License

MIT
