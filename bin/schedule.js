global.__DEVELOPMENT__ = 'development'
global.__TEST__ = 'test'
global.__PRODUCTION__ = 'production'
// eslint-disable-next-line
global.__ENV__ = process.env.NODE_ENV === __PRODUCTION__ ? __PRODUCTION__
  : process.env.NODE_ENV === __TEST__ ? __TEST__ : __DEVELOPMENT__


require('babel-polyfill')
require('babel-register')
global.logger = require('../helpers/logger')

require('../schedule')


process.on('uncaughtException', (err) => {
  console.log(err)
})
