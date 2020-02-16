const test = require('ava')
const getStdin = require('../')

const stdin = process.stdin

test.beforeEach(() =>
  stdin.removeAllListeners()
)

test.serial('get stdin', (t) => {
  t.plan(1)
  setImmediate(() => {
    stdin.push('unicorns')
    setImmediate(() => {
      stdin.emit('end')
    })
  })
  return getStdin().then((r) => t.is(r, 'unicorns'))
})

test.serial('get stdin as a buffer', (t) => {
  t.plan(1)
  const promise = getStdin({ buffer: true }).then((r) => {
    t.is(r.toString().trim(), 'unicorns-foobar')
  })
  stdin.push('unicorns')
  stdin.push(Buffer.from('-foobar'))
  setImmediate(() => {
    stdin.emit('end')
  })
  return promise
})

test.serial('return timeout error', (t) => {
  t.plan(1)
  return getStdin({ timeout: 10 }).catch((err) => {
    t.is(err.message, 'stdin timeout')
  })
})

test.serial('clear timeout on data', (t) => {
  t.plan(1)
  const promise = getStdin({ timeout: 10 }).then((r) => {
    t.is(r, 'unicorns')
  })
  stdin.push('unicorns')
  setImmediate(() => {
    stdin.emit('end')
  })
  return promise
})

test.serial('reject if TTY', (t) => {
  t.plan(1)
  stdin.isTTY = true
  return getStdin({ rejectTTY: true }).catch((err) => {
    t.is(err.message, 'stdin is TTY')
  })
})
