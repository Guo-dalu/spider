import request from 'superagent'
import { USER_AGENTS } from './agent'

const URLS = [
  'blog.csdn.net/github_36487770/article/details/81052936',
  'blog.csdn.net/github_36487770/article/details/81168346',
  'blog.csdn.net/github_36487770/article/details/80319121',
  'blog.csdn.net/github_36487770/article/details/78538231',
  'blog.csdn.net/github_36487770/article/details/75426058',
  'blog.csdn.net/github_36487770/article/details/78750589',
  'blog.csdn.net/github_36487770/article/details/59127556',
  'blog.csdn.net/github_36487770/article/details/80228147',
  'blog.csdn.net/github_36487770/article/details/79699841',
  'blog.csdn.net/github_36487770/article/details/79710564',
  'blog.csdn.net/github_36487770/article/details/79725542',
  'blog.csdn.net/github_36487770/article/details/79738240',
  'blog.csdn.net/github_36487770/article/details/79524548',
  'blog.csdn.net/github_36487770/article/details/79524236',
  'blog.csdn.net/github_36487770/article/details/79452274',
  'blog.csdn.net/github_36487770/article/details/79487976',
  'blog.csdn.net/github_36487770/article/details/78899664',
  'blog.csdn.net/github_36487770/article/details/78932193',
  'blog.csdn.net/github_36487770/article/details/78971761',
  'blog.csdn.net/github_36487770/article/details/79073888',
  'blog.csdn.net/github_36487770/article/details/79376643',
  'blog.csdn.net/github_36487770/article/details/78750589',
  'blog.csdn.net/github_36487770/article/details/78740584',
  'blog.csdn.net/github_36487770/article/details/78731474',
  'blog.csdn.net/github_36487770/article/details/78538231',
  'blog.csdn.net/github_36487770/article/details/78364558',
  'blog.csdn.net/github_36487770/article/details/78344711',
  'blog.csdn.net/github_36487770/article/details/77446598',
  'blog.csdn.net/github_36487770/article/details/77749672'
]
const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })
let tryTimes = 0

async function spider(i) {
  const res = await request
    .get(URLS[i % 4])
    .set({
      'User-Agent': USER_AGENTS[Math.floor(i / 200)],
      protocal: 'https: '
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
