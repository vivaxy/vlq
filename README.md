# @vivaxy/vlq

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Standard Version][standard-version-image]][standard-version-url]
[![Codecov][codecov-image]][codecov-url]

## Install

`yarn add @vivaxy/vlq` or `npm i @vivaxy/vlq`

## Usage

```js
import { encode, decode } from '@vivaxy/vlq';
// encode
encode(0);
// decode
decode('A');
```

## API

`encode(input: number | number[]): string`

`decode(input: string): number[]`

## Benchmark

### decode

vlq#decode x 1,103,260 ops/sec ±0.62% (91 runs sampled)

@vivaxy/vlq#decode x 1,935,656 ops/sec ±0.47% (95 runs sampled)

Fastest is @vivaxy/vlq#decode

### encode

vlq#encode x 4,445,119 ops/sec ±0.91% (91 runs sampled)

@vivaxy/vlq#encode x 3,454,481 ops/sec ±0.76% (92 runs sampled)

Fastest is vlq#encode

## Related Projects

- [vlq](https://github.com/Rich-Harris/vlq)

_(Project created by [create-n](https://github.com/vivaxy/create-n).)_

[travis-image]: https://img.shields.io/travis/vivaxy/vlq.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/vlq
[npm-version-image]: https://img.shields.io/npm/v/@vivaxy/vlq.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@vivaxy/vlq
[npm-downloads-image]: https://img.shields.io/npm/dt/@vivaxy/vlq.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/@vivaxy/vlq.svg?style=flat-square
[license-url]: LICENSE
[standard-version-image]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[standard-version-url]: https://github.com/conventional-changelog/standard-version
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/vlq.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/vlq
