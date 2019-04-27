//https://stackoverflow.com/questions/48620800/export-to-excel-with-react-and-sheetjs
import moment from 'moment'

function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}
const download = (url, name) => {
  let a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()

  window.URL.revokeObjectURL(url)
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i=0; i !== s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF
  }

  return buf
}

function formatDate(date){
  return moment(date).format('DD-MM-YYYY h:mm a')
}

function getTotal(data){
  const res = [
    {" ": "Start Date", "": formatDate(data.startDate)},
    {" ": "End Date", "": formatDate(data.endDate)},
    {" ": "Total Of Students", "": data.TotalOfStudents},
    {" ": "Total Of Books", "": data.TotalOfBooks},
    {" ": "Total Of Tickets", "": data.TotalOfTickets},
    {" ": "Total Of Fee", "": data.TotalOfFee}
  ]
  return res
}

function getTopStudents(data){
  let res = []
  const students = data.TopStudents
  res = students.map( student => {
    return {
      "STD ID": student.student_id,
      "NAME": student.name,
      "EMAIL": student.email,
      "TOTAL OF BORROWED BOOKS": student.total_of_borrowed_books
    }
  })
  res.push({})
  res.push({
    "STD ID": `=> TOP ${data.TopNStudents} BORROWERS`
  })
  return res
}

function getTopBooks(data){
  let res = []
  const books = data.TopBooks
  res = books.map( book => {
    return {
      "BOOK ID": book.id,
      "TITLE": book.title,
      "TOTAL OF BORROWERS": book.total_of_students
    }
  })
  res.push({})
  res.push({
    "BOOK ID": `=> TOP ${data.TopNBooks} BORROWED BOOKS`
  })
  return res
}

export default data => {
  import('xlsx').then(XLSX => {
    const wb = new Workbook()
    const total = getTotal(data)
    const topStudents = getTopStudents(data)
    const topBooks = getTopBooks(data)

    const ws1 = XLSX.utils.json_to_sheet(total)
    wb.SheetNames.push('Total')
    wb.Sheets['Total'] = ws1

    const ws2 = XLSX.utils.json_to_sheet(topStudents)
    wb.SheetNames.push('Top Students (Borowers)')
    wb.Sheets['Top Students (Borowers)'] = ws2

    const ws3 = XLSX.utils.json_to_sheet(topBooks)
    wb.SheetNames.push('Top Borrowed Books')
    wb.Sheets['Top Borrowed Books'] = ws3

    const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST:true, type: 'binary'})

    let url = window.URL.createObjectURL(new Blob([s2ab(wbout)],{type: 'application/octet-stream'}))

    download(url, `REPORT ${formatDate(data.startDate)} ===== ${formatDate(data.endDate)}.xlsx`)
  })
}