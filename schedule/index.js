
import Schedule from 'node-schedule'

Schedule.scheduleJob('42 * * * *', () => {
  try {
    require('./csdn')()
  } catch (e) {
    logger.error('爬取CSDN出现错误', e)
  }
})
