import winston from 'winston'
import RotateFile from 'winston-daily-rotate-file'


import config from '../config'

console.log(config)

const winstonConfig = config.winston

winston.setLevels({
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
})

winston.addColors({
  debug: 'blue',
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
})

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: winstonConfig.consoleLevel,
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: () => (new Date().toLocaleString()),
    }),
    new (RotateFile)({
      level: winstonConfig.fileLevel,
      prettyPrint: true,
      silent: false,
      colorize: false,
      filename: winstonConfig.filename,
      timestamp: () => (new Date().toLocaleString()),
      json: false,
      maxFiles: 10,
      datePattern: '.yyyy-MM-dd',
    }),
  ],
})

export default logger
