import cheerio from 'cheerio'
import fs from 'fs'
import request from '../utils/request'
import browserPromise from '../utils/browser'


const BASE_URL = 'https://h.fkxs.net'

async function getChapters() {
  const res = await request.get(`${BASE_URL}/book/148674/0/1.html`).buffer(true)
  const $ = cheerio.load(res.text)
  const list = $('.dc-cap > a')
  return Array.from(list).map((item) => {
    const element = $(item)
    return {
      title: element.text(),
      link: `${BASE_URL}${element.attr('href')}`,
    }
  })
}


async function getChapterContent(chapterUrl) {
  let article = ''
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.goto(chapterUrl, {
    waitUntil: 'networkidle0',
  })
  const _getNext = async (_page) => {
    const nextWord = await _page.$eval('#btnNext', e => e.innerText)
    const newContent = await _page.$eval('#nr', r => r.innerText)
    article += newContent.slice(0, -37)
    if (nextWord === '下一章' || nextWord === '暂无下一章') {
      return
    }
    await Promise.all([_page.click('#btnNext'), _page.waitForNavigation()])
    await _getNext(_page)
  }
  await _getNext(page)
  return article
}


async function saveBook() {
  const chapters = await getChapters()
  for (let i = 0; i < chapters.length; i += 1) {
    const content = await getChapterContent(chapters[i].link)
    fs.writeFileSync(`./人间观察黑皮书/${chapters[i].title.trim()}.txt`, content)
  }
}


saveBook()
