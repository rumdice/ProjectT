import * as csv from 'fast-csv'
import fs from "fs"
import * as xlsx from "./xlsx"

export const start = async () => {
    console.log(`start csv`)
    const fileData = await readAsync()
    //await csvRead(fileData)
    await csvParse(fileData)
}


async function csvRead(data: fs.ReadStream) {
    csv.parseStream(data)
        .on('error', error => console.error(error))
        .on('data', row => console.log(row))
        .on('end', (rowCount: number) => console.log(`row count ${rowCount}`))
}

async function csvParse(data: any) {
    const rows: any[] = []
    data
        .pipe(csv.parse())
        .on('data', (row: any) => rows.push(row))
        .on('end', () => { outputData(rows) })
}

const outputData = async (datas: any[]) => {
    console.log(datas)
    console.log('csv done')

    await xlsx.start()
}

async function readAsync() {
    return fs.createReadStream(`../../table/my.csv`) // out 폴더 기준
}
