import xlsx from 'node-xlsx'
import fs from "fs"
import { tablePathBaseXlsx, xlsxFiles } from './define'

export const start = async () => {
    console.log(`xlsx parse Start!`)
    await xlsxParseBuffer()
    console.log(`xlsx parse Done!`)
}

async function xlsxParseBuffer() {

    xlsxFiles.forEach(async f => {
        const path = `${tablePathBaseXlsx}/${f}`
        const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path))
        const worksheetname = workSheetsFromBuffer[0].name
        const worksheetdata = workSheetsFromBuffer[0].data
        console.log(worksheetdata)
    })
}

async function xlsxParseFile() {

    xlsxFiles.forEach(async f => {
        const workSheetsFromFile = xlsx.parse(f)
        const worksheetname = workSheetsFromFile[0].name
        const worksheetdata = workSheetsFromFile[0].data
        console.log(worksheetdata)
    })
}