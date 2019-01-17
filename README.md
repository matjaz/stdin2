# stdin2 [![Build status][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url] [![js-standard-style][standard-image]][standard-url] [![Dependencies][david-image]][david-url] [![devDependencies][david-dev-image]][david-dev-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/matjaz/stdin2.svg)](https://greenkeeper.io/)

> Get [stdin](https://nodejs.org/api/process.html#process_process_stdin) as a string or buffer, using promise.  Supports timeout & tty.

## Install

```
$ npm install --save stdin2
```

## Usage

```js
// example.js
const getStdin = require('stdin2')

getStdin().then(str => {
  console.log(str)
})
```

```
$ echo unicorns | node example.js
unicorns
```
Using ES7 `await`
```js
import getStdin from 'stdin2'

(async function () {
  try {
    console.log(await getStdin())
  } catch (e) {
    console.error(e)
  }
})()
```

## API

Function returns a promise that is resolved when the `end` event fires on the `stdin` stream, indicating that there is no more data to be read.

### getStdin([options])

Get `stdin` as a string.

### Options

  - buffer _(false)_ - returns buffer instead of a string
  - timeout _(Infinity)_ - rejects after miliseconds, if no data is read
  - rejectTTY _(false)_ - rejects if program is run in TTY

## License

MIT

[npm-image]: https://img.shields.io/npm/v/stdin2.svg
[npm-url]: https://www.npmjs.com/package/stdin2
[travis-image]: https://img.shields.io/travis/matjaz/stdin2/master.svg?style=flat
[travis-url]: https://travis-ci.org/matjaz/stdin2
[coverage-image]: https://img.shields.io/coveralls/matjaz/stdin2/master.svg?style=flat
[coverage-url]: https://coveralls.io/r/matjaz/stdin2
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com
[david-image]: https://img.shields.io/david/matjaz/stdin2.svg?style=flat
[david-url]: https://david-dm.org/matjaz/stdin2
[david-dev-image]: https://img.shields.io/david/dev/matjaz/stdin2.svg?style=flat
[david-dev-url]: https://david-dm.org/matjaz/stdin2#info=devDependencies
