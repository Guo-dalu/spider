import puppeteer from 'puppeteer'
import request from 'superagent'
import path from 'path'
import fs from 'fs'


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

async function getMusic(url) {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('audio')
  const src = await page.$eval('audio', el => el.src)
  const title = await page.title()
  await downloadMp3({ src, title })
  await browser.close()
}

getMusic('http://5sing.kugou.com/fc/10285977.html')
