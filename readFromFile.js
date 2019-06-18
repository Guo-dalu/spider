import xlsx from 'xlsx'

const workbook = xlsx.readFile('zhihu.xlsx')


const contents = ['瞎扯', '大误', '小事']
  .map(v => workbook.Sheets[v])
  .map(sheet => xlsx.utils.sheet_to_json(sheet))

export default contents
