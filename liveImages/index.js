import request from 'superagent'
import path from 'path'
import fs from 'fs'
import browserPromise from '../utils/browser'
import { bulk } from '../utils/bulk'

const LIVE_URL = ''

async function downloadImage({ src, title }) {
  const stream = fs.createWriteStream(
    path.join(__dirname, `./downloads/${title}.jpg`)
  )
  const req = request.get(src)
  req
    .pipe(stream)
    .on('error', () => {
      console.log(title, 'failed in download')
    })
    .on('close', () => {
      console.log(title, 'is downloadded')
    })
}

async function getAllLiveImages(url) {
  let i = 0
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle0',
  })

  const imageUrls = page.$$eval('.photo-item', els => els.map((el) => {
    const backgroundImage = el.style.backgroundImage.match(
      /url\(\s*(['"]?)(.*?)\1\s*\)/i
    )[2]
    return backgroundImage
      ? {
        src: `https:${backgroundImage}`,
        // eslint-disable-next-line no-plusplus
        title: i++,
      }
      : null
  }))

  await bulk(imageUrls, downloadImage)
  await browser.close()
}

getAllLiveImages(LIVE_URL)
