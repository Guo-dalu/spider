import request from 'request'
import cheerio from 'cheerio'
import fs from 'fs'
import iconv from 'iconv-lite'

const baseUrl = 'http://www.txt101.com/id/8221'
const startPageIndex = 28762188
const endPageIndex = 2108470

async function getPageContent(pageIndex) {
	request.get(
		{
			url: `${baseUrl}/${pageIndex}.html`,
			encoding: null,
		},
		function(err, res, body) {
			const input = iconv.decode(body, 'gbk')
			const $ = cheerio.load(input)
			fs.writeFileSync('lala.txt', $('#content').text())
		}
	)
}

getPageContent(endPageIndex)
