import Schedule from 'node-schedule'

Schedule.scheduleJob('42 * * * *', () => {
  try {
    // require('./boss')()
  } catch (e) {
    logger.error(e)
  }
})
