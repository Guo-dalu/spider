import fetch from 'superagent'
import cheerio from 'cheerio'


const transAnswer = (answer) => {
  const $ = cheerio.load(answer)
  let author = $('.author').text()
  if (author[author.length - 1] === '，') {
    author = author.slice(0, -1)
  }
  const detail = []
  $('.content>p').each((i, ele) => {
    const image = $('.content-image', ele)
    if (image.length) {
      detail.push(image.attr('src'))
    } else {
      detail.push($(ele).text())
    }
  })
  return {
    detail, author,
  }
}

const transArticle = ($) => {
  const title = $('.headline-title').text()
  const question = $('.question-title').text()
  const answers = []
  $('.answer').each((i, ele) => {
    answers.push(transAnswer((ele)))
  })
  return {
    title,
    question,
    answers,
  }
}

async function fetchStory(url) {
  const html = await fetch(url)
  const $ = cheerio.load(html.text)
  console.log(transArticle($))
  return transArticle($)
}

export default fetchStory
