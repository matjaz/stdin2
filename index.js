var stdin = process.stdin

Stdin.buffer = false // return buffer
Stdin.timeout = Infinity // mili sec
Stdin.rejectTTY = false

module.exports = Stdin

function Stdin (options) {
  return new Promise(function (resolve, reject) {
    var opts = merge({
      buffer: Stdin.buffer,
      timeout: Stdin.timeout,
      rejectTTY: Stdin.rejectTTY
    }, options)

    if (opts.rejectTTY && stdin.isTTY) {
      reject(new Error('stdin is TTY'))
      return
    }

    if (!opts.buffer) {
      stdin.setEncoding('utf8')
    }

    var timeout
    if (opts.timeout > 0 && opts.timeout !== Infinity) {
      timeout = setTimeout(function () {
        reject(new Error('stdin timeout'))
        stdin.end()
      }, opts.timeout)
    }

    var len = 0
    var ret = []
    stdin.on('readable', function () {
      var chunk
      while ((chunk = stdin.read())) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        ret.push(chunk)
        len += chunk.length
      }
    })

    stdin.on('end', function () {
      if (opts.buffer) {
        resolve(Buffer.concat(ret.map(function (chunk) {
          return Buffer.from(chunk)
        }), len))
      } else {
        resolve(ret.join(''))
      }
    })
  })
}

function merge (target, src) {
  if (src) {
    for (var k in src) {
      target[k] = src[k]
    }
  }
  return target
}
