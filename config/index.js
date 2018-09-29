const development = {
  winston: {
    consoleLevel: 'debug',
    fileLevel: 'error',
    filename: 'spider.log',
  },
}

const production = {
  winston: {
    consoleLevel: 'debug',
    fileLevel: 'error',
    filename: '../logs/spider/spider.log',
  },
}

const config = { development, production }

export default config[__ENV__]
