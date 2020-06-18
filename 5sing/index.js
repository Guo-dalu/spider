import request from 'superagent'
import path from 'path'
import fs from 'fs'
import browserPromise from '../utils/browser'
import { bulk } from '../utils/bulk'


async function downloadMp3({ src, title }) {
  const stream = fs.createWriteStream(path.join(__dirname, `./download/${title}.mp3`))
  const req = request.get(src)
  req.pipe(stream).on('error', () => {
    console.log(title, 'failed in download')
  })
    .on('close', () => {
      console.log(title, 'is downloadded')
    })
}

async function getSingleSong(url, browser) {
  const page = await browser.newPage()
  await page.goto(url)
  const result = await page.waitForSelector('audio')
  if (!result) {
    console.log('no audio element found in page')
    return
  }
  const src = await page.$eval('audio', el => el.src)
  const title = await page.title()
  await page.close()
  await downloadMp3({ src, title })
}

async function getSongListByMusician(url) {
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle0',
  })
  const songs = await page.$$eval('.song_name a', els => els.map(el => el.href))
  const deal = async (song) => { await getSingleSong(song, browser) }
  await bulk(songs, deal)
  await browser.close()
}


getSongListByMusician('http://5sing.kugou.com/11474687/yc/1.html')
