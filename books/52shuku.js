import cheerio from 'cheerio'
import fs from 'fs'
import request from '../utils/request'
import sleep from '../utils/sleep'

const startPageIndex = 2
const endPageIndex = 2167
const getUrl = (pageIndex) =>
  `https://www.52shuku.vip/yanqing/04_b/bjSi2_${pageIndex}.html`

async function getPageContent(pageIndex) {
  const res = await request.get(getUrl(pageIndex))
  const $ = cheerio.load(res.text)
  const content = $('#text').text()
  return content
}

function concatArticles(articles) {
  const result = articles.reduce((prev, article) => `${prev}${article}`, '')
  return result
}

async function saveBook() {
  const articles = []
  for (let i = startPageIndex; i <= endPageIndex; i += 1) {
    const article = await getPageContent(i)
    articles.push(article)
    if (i % 100 === 0) {
      console.log(`processing with page index = ${i} `)
      sleep(500)
    }
  }
  const book = concatArticles(articles)

  fs.writeFileSync('./祝姑娘今天掉坑了没.txt', book)
}

saveBook()
