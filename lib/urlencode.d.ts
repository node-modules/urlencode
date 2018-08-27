/// <reference types="iconv-lite" />

declare module 'urlencode' {
  import iconv from 'iconv-lite'

  type PotentialObject = any[] | any

  interface Config {
    charset?: string
    maxKeys?: number | string
  }

  function isUTF8(charset: string): boolean

  function has(obj: object, prop: string | number | symbol): boolean

  function isASCII(str: string): boolean

  function encodeComponent(item: any, charset: string): string

  function stringifyString(str: string, prefix: string | number, options: Config): string

  function stringifyArray(arr: any[], prefix?: string | number, options?: Config): string

  function stringifyObject(obj: object, prefix?: string | number, options?: Config): string

  export function encode(str: string, charset: string): string

  export function decode(str: string, charset: string): string

  export function parse(qs: string, options?: Config): object
  export function parse(qs: string, sep?: string | number, eq?: string | number, options?: Config): object

  export function stringify(obj: PotentialObject, prefix?: object | string, options?: Config): string
}
