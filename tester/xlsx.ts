import xlsx from 'node-xlsx'
import fs from "fs"

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/test.xlsx`))
console.log(workSheetsFromBuffer)

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/test.xlsx`)
console.log(workSheetsFromFile)

const worksheetname = workSheetsFromFile[0].name
const worksheetdata = workSheetsFromFile[0].data

// TODO: 테이블 내용 파싱
