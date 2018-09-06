const development = {
  winston: {
    consoleLevel: 'debug',
    fileLevel: 'error',
    filename: 'timing-service.log',
    debugFilename: 'timing-debug.log',
  },
}

const production = {
  winston: {
    consoleLevel: 'info',
    fileLevel: 'error',
    filename: '/logs/timing-tasks/timing-service.log',
    debugFilename: '/logs/timing-tasks/timing-debug.log',
  },
}

const config = { development, production }

export default config[__ENV__]
