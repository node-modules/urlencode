/// <reference types="iconv-lite" />

declare module 'urlencode' {
  import iconv from 'iconv-lite'

  type PotentialObject = any[] | any

  interface Config {
    charset?: string
    maxKeys?: number | string
  }

  export function encode(str: string, charset: string): string

  export function decode(str: string, charset: string): string

  export function parse(qs: string, options?: Config): object
  export function parse(qs: string, sep?: string | number, eq?: string | number, options?: Config): object

  export function stringify(obj: PotentialObject, prefix?: object | string, options?: Config): string
}
