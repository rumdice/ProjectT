import * as csv from 'fast-csv'
import fs from "fs"

export const start = async () => {
    await csvRead()
}


async function csvRead() {
    console.log('start')

    const fileData = await readAsync()
    csv.parseStream(fileData)
        .on('error', error => console.error(error))
        .on('data', row => console.log(row))
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))

    console.log('end')
}


export async function readAsync() {
    return fs.createReadStream(`../../table/my.csv`) // out 폴더 기준
}
