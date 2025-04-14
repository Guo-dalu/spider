import fs from 'fs'
import path from 'path'
import request from '../utils/request'

const BASE_URL = 'http://lyecs.ccppg.com.cn'

async function saveMagazineForWholeYear(year) {
  for (let i = 1; i <= 12; i += 1) {
    const issue = `${year}${i.toString().padStart(2, '0')}`
    const downloadFolderPath =  path.join(__dirname, `./download/`)
    if (!fs.existsSync(downloadFolderPath)){
      fs.mkdirSync(downloadFolderPath);
    }
    const stream = fs.createWriteStream(
      path.join(downloadFolderPath, `./${issue}.pdf`)

    )
    const req = request.get(`${BASE_URL}/pdf/${issue}.pdf`)

    await new Promise((resolve, reject) => {
      req
        .pipe(stream)
        .on('error', () => {
          console.log(issue, 'failed in download')
          reject()
        })
        .on('close', () => {
          console.log(issue, 'is downloaded')
          resolve()
        })
    })
  }
}

async function saveMagazines(startYear, endYear) {
  for (let i = startYear; i <= endYear; i += 1) {
    await saveMagazineForWholeYear(i)
  }
}

saveMagazines(2002, 2015)
