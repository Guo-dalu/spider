// require('babel-register')
// require('babel-polyfill')

// require('./5sing')

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
  const page = await browser.newPage()
  await page.goto('http://5sing.kugou.com/fc/13829822.html', {
    waitUntil: 'load',
  })
  await page.screenshot({ path: './5sing.png' })
})()
