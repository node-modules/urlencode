urlencode2 [![Build Status](https://travis-ci.org/alsotang/urlencode.svg)](https://travis-ci.org/alsotang/urlencode)
=======

encodeURIComponent with charset, e.g.: `gbk`

## Install

```bash
$ npm install urlencode2
```

## Usage

### urlencode(string, charset)

```js
var urlencode = require('urlencode2');

urlencode('苏千'); // default charset is utf8
urlencode('苏千', 'gbk'); // => '%CB%D5%C7%A7'
```

### decode(string, charset)

```js
urlencode.decode('%CB%D5%C7%A7', 'gbk'); // => '苏千'
```

### parse(string, options)

```js
// parse gbk querystring. support nest
urlencode.parse('nick=%CB%D5%C7%A7', {charset: 'gbk'});
// => {nick: '苏千'}
```

### stringify(obj, options)

```js
// stringify obj with gbk encoding. support nest
// equals: x[y][0][v][w]=%CE%ED%BF%D5
var str = 'x[y][0][v][w]=' + urlencode('雾空', 'gbk');
var obj =  {'x' : {'y' : [{'v' : {'w' : '雾空'}}]}};
urlencode.stringify(obj, {charset: 'gbk'}).should.equal(str);
```

## License

MIT
