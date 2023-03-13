require('babel-register')
require('babel-polyfill')

require('./liveImages')

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection', reason, promise)
})

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err)
})
