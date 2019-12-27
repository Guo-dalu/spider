import cheerio from 'cheerio'
import fs from 'fs'
import request from '../utils/request'
import sleep from '../utils/sleep'


const baseUrl = 'http://www.txt101.com/id/8221'
const startPageIndex = 2108280
const endPageIndex = 2108470


async function getPageContent(pageIndex) {
  const res = await request.get(`${baseUrl}/${pageIndex}.html`).charset('gbk').buffer(true)
  const $ = cheerio.load(res.text)
  return {
    title: $('.bname_content').text(),
    content: $('#content').text(),
  }
}

function concatArticles(articles) {
  const result = articles.reduce((prev, article) => `${prev}

	-------------------   ${article.title}   ------------------------
	
	${article.content}`, '')
  return result
}

async function saveBook() {
  const articles = []
  for (let i = startPageIndex; i <= endPageIndex; i += 1) {
    const article = await getPageContent(i)
    articles.push(article)
    if (i % 5 === 0) {
      sleep(500)
    }
  }
  const book = concatArticles(articles)

  fs.writeFileSync('./女主都和男二HE.txt', book)
}

saveBook()
