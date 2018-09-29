import winston from 'winston'
import RotateFile from 'winston-daily-rotate-file'

import config from '../config'

const { createLogger, format, transports, addColors } = winston
const { combine, timestamp, label, printf } = format
const winstonConfig = config.winston

const myFormat = printf(info =>
  `${new Date(info.timestamp).toLocaleString()} - [${info.label}] - ${info.level}: ${info.message}`)

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    debug: 'blue',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
  },
}

addColors(myCustomLevels.colors)

const logger = createLogger({
  level: 'debug',
  levels: myCustomLevels.levels,
  format: combine(
    format.colorize(),
    label({ label: 'schedule' }),
    timestamp(),
    myFormat,
  ),
  exitOnError: false,
  transports: [
    new (transports.Console)(),
    new RotateFile({
      level: winstonConfig.fileLevel,
      filename: winstonConfig.filename,
      timestamp: () => (new Date().toLocaleString()),
      maxFiles: 10,
      handleExceptions: true,
    }),
  ],
})

export default logger
