import request from 'superagent'
import { USER_AGENTS } from './agent'

const URLS = []

const sleep = ms => new Promise((resolve) => {
  setTimeout(resolve, ms)
})
let tryTimes = 0

async function spider(i) {
  const res = await request
    .get(URLS[i % 4])
    .set({
      'User-Agent': USER_AGENTS[Math.floor(i / 200)],
      protocal: 'https: ',
    })
    .timeout(1000)
  console.log('get', i)
}

async function pro() {
  for (let i = 0; i < 2000 * USER_AGENTS.length; i++) {
    try {
      await spider(i)
    } catch (e) {
      console.error(e)
      if (++tryTimes < 10) {
        await spider(i)
      }
    }
    await sleep(5000)
  }
}

pro()
