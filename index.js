import xlsx from 'xlsx'

const wb = xlsx.utils.book_new()

const data = [{
  title: 'qwe',
  question: '???',
  author: 'xuemengge',
  detail: ['1', '234', 'jiji'].join('\n'),
}]
const ws = xlsx.utils.json_to_sheet(data)

xlsx.utils.book_append_sheet(wb, ws, 'lala')

xlsx.writeFile(wb, 'out.xlsx')
