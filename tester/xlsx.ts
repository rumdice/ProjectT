import xlsx from 'node-xlsx'
import fs from "fs"


// 의도한 대로 순서대로 비동기 동작
export const start = async () => {
    console.log(`start xlsx`)
    await xlsxParseBuffer()
}

async function xlsxParseFile() {
    const workSheetsFromFile = xlsx.parse(`../../table/my.xlsx`)

    const worksheetname = workSheetsFromFile[0].name
    const worksheetdata = workSheetsFromFile[0].data

    console.log(worksheetdata)
}


async function xlsxParseBuffer() {
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`../../table/my.xlsx`))

    const worksheetname = workSheetsFromBuffer[0].name
    const worksheetdata = workSheetsFromBuffer[0].data

    console.log(worksheetdata)
    console.log(`xlsx done`)
}