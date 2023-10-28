import iconv from 'iconv-lite';

export type SupportEncodeValue = string | number | boolean | undefined | null;
export type SupportEncodeObject = Record<string, object | SupportEncodeValue>;
export interface Options {
  charset?: string;
  maxKeys?: number;
}

function isUTF8(charset?: string) {
  if (!charset) {
    return true;
  }
  charset = charset.toLowerCase();
  return charset === 'utf8' || charset === 'utf-8';
}

export function encode(str: string, charset?: string | null) {
  if (!charset || isUTF8(charset)) {
    return encodeURIComponent(str);
  }

  const buf = iconv.encode(str, charset);
  let encodeStr = '';
  let ch = '';
  for (let i = 0; i < buf.length; i++) {
    ch = buf[i].toString(16);
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += '%' + ch;
  }
  encodeStr = encodeStr.toUpperCase();
  return encodeStr;
}

export default encode;

export function decode(str: string, charset?: string | null) {
  if (!charset || isUTF8(charset)) {
    return decodeURIComponent(str);
  }

  const bytes = [];
  for (let i = 0; i < str.length;) {
    if (str[i] === '%') {
      i++;
      bytes.push(parseInt(str.substring(i, i + 2), 16));
      i += 2;
    } else {
      bytes.push(str.charCodeAt(i));
      i++;
    }
  }
  const buf = Buffer.from(bytes);
  return iconv.decode(buf, charset);
}

export function parse(qs: string, options?: Options): SupportEncodeObject;
export function parse(qs: string, sep?: string, eq?: string, options?: Options): SupportEncodeObject;
export function parse(qs: string, sepOrOptions?: string | Options, eq?: string, options?: Options): SupportEncodeObject {
  let sep: string | undefined;
  if (typeof sepOrOptions === 'object') {
    // parse(qs, options)
    options = sepOrOptions;
  } else {
    // parse(qs, sep, eq, options)
    sep = sepOrOptions;
  }

  sep = sep || '&';
  eq = eq || '=';
  const obj: SupportEncodeObject = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  const regexp = /\+/g;
  const splits = qs.split(sep);

  let maxKeys = 1000;
  let charset = '';
  if (options) {
    if (typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }
    if (typeof options.charset === 'string') {
      charset = options.charset;
    }
  }

  let len = splits.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (let i = 0; i < len; ++i) {
    const x = splits[i].replace(regexp, '%20');
    const idx = x.indexOf(eq);
    let keyString: string;
    let valueString: string;
    let k: string;
    let v: string;

    if (idx >= 0) {
      keyString = x.substring(0, idx);
      valueString = x.substring(idx + 1);
    } else {
      keyString = x;
      valueString = '';
    }

    if (keyString && keyString.includes('%')) {
      try {
        k = decode(keyString, charset);
      } catch (e) {
        k = keyString;
      }
    } else {
      k = keyString;
    }

    if (valueString && valueString.includes('%')) {
      try {
        v = decode(valueString, charset);
      } catch (e) {
        v = valueString;
      }
    } else {
      v = valueString;
    }

    if (!has(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      (obj[k] as any).push(v);
    } else {
      obj[k] = [ obj[k], v ];
    }
  }

  return obj;
}

function has(obj: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isASCII(str: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

function encodeComponent(item: string, charset?: string) {
  item = String(item);
  if (isASCII(item)) {
    item = encodeURIComponent(item);
  } else {
    item = encode(item, charset);
  }
  return item;
}

function stringifyArray(values: (SupportEncodeValue | SupportEncodeObject)[], prefix: string, options: Options) {
  const items = [];
  for (const [ index, value ] of values.entries()) {
    items.push(stringify(value, `${prefix}[${index}]`, options));
  }
  return items.join('&');
}

function stringifyObject(obj: SupportEncodeObject, prefix: string, options: Options) {
  const items = [];
  const charset = options.charset;
  for (const key in obj) {
    if (key === '') {
      continue;
    }
    const value = obj[key];
    if (value === null || value === undefined) {
      items.push(encode(key, charset) + '=');
    } else {
      const keyPrefix = prefix ? prefix + '[' + encodeComponent(key, charset) + ']' : encodeComponent(key, charset);
      items.push(stringify(value, keyPrefix, options));
    }
  }
  return items.join('&');
}

export function stringify(obj: object | SupportEncodeValue, prefix?: string): string;
export function stringify(obj: object | SupportEncodeValue, options?: Options): string;
export function stringify(obj: object | SupportEncodeValue, prefix?: string, options?: Options): string;
export function stringify(obj: object | SupportEncodeValue, prefixOrOptions?: string | Options, options?: Options): string {
  let prefix: string | undefined;
  if (typeof prefixOrOptions !== 'string') {
    options = prefixOrOptions || {};
  } else {
    prefix = prefixOrOptions;
  }
  options = options ?? {};
  if (Array.isArray(obj)) {
    if (!prefix) {
      throw new TypeError('stringify expects an object');
    }
    return stringifyArray(obj, prefix, options);
  }

  const objValue = String(obj);
  if (obj && typeof obj === 'object' && objValue === '[object Object]') {
    return stringifyObject(obj as SupportEncodeObject, prefix ?? '', options);
  }

  if (!prefix) {
    throw new TypeError('stringify expects an object');
  }
  const charset = options?.charset ?? 'utf-8';
  return `${prefix}=${encodeComponent(objValue, charset)}`;
}
