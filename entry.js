require('babel-register')
require('babel-polyfill')

require('./5sing')

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection', reason, promise)
})

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err)
})
