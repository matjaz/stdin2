var stdin = require('./')

// stdin.buffer = true
// stdin.timeout = 2000
// stdin.rejectTTY = true

var options

options = {}
// options.buffer = true
// options.timeout = 2000
// options.rejectTTY = true

stdin(options)
  .then(function (res) {
    console.log(res)
  })
  .catch(function (err) {
    console.error(err)
  })
