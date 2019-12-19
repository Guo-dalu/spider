import Schedule from 'node-schedule'

Schedule.scheduleJob('0 * * * *', () => {
  try {
    require('./books')()
  } catch (e) {
    logger.error('爬取books出现错误', e)
  }
})
