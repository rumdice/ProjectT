import * as csv from 'fast-csv'
import fs from "fs"

export const main = async () => {
    console.log('start')
    await mycsvread()
    console.log('end'); // 이 부분이 먼저 나옴
}


async function mycsvread() {
    const asystre = await readAsync()
    csv.parseStream(asystre)
        .on('error', error => console.error(error))
        .on('data', row => console.log(row))
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))
}


export async function readAsync() {
    return fs.createReadStream(`../../table/my.csv`) // out 폴더 기준
}
