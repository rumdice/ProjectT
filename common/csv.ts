import * as csv from 'fast-csv'
import fs from "fs"
import { AllTableList, Table } from '../game_svr/data/interface'
import { csvFiles, tablePathBaseCsv } from './define'
import { LoggerGame } from './logger'

export const csvStart = async () => {
    const promise = new Promise((resolve, reject) => {
        process((err: any, reply: any) => {
            if (err) reject(err)
            resolve(reply)
        })
    })

    return promise
}

async function csvReadCallback(callback: any, fileData: any, fileName: string) {
    LoggerGame.info(`start csv! ${fileName}`)

    // 테이블 객체 생성
    const listData: Table = {
        name : "",
        data : [],
    }

    csv.parseStream(fileData)
        .on('error', error => console.error(error))
        // .on('data', row => printOut(row))
        .on('data', row => saveRow(row, listData.data))
        .on('end', () => callback(null, `${printRow(listData, fileName)}`))
}

async function process(cb: any) {
    csvFiles.forEach(async f => {
        const path = `${tablePathBaseCsv}/${f}`
        const data = await readAsync(path)
        await csvReadCallback(cb, data, f)
    })
}

function printOut(data: any) {
    console.log(data.toString())
}

function printRow(_table: any, fileName: string) {
    // TODO: 성능 관계상 확인이 필요할때만 로그 출력
    // LoggerGame.info(`TableData: ${_table.data.toString()}`);

    _table.name = fileName

    AllTableList.push(_table)                  // row 단위로 메모리 올라간 data와 이름을 정하여 전체 매모리로 올리기

    LoggerGame.info(`FileName: ${_table.name}`)
    LoggerGame.info(`TableRows: ${_table.data.length}`)
    LoggerGame.info('done csv!')
    LoggerGame.info('push table done!')
}

function saveRow(rowData: any, dataList: any) {
    dataList.push(rowData)                      // row 단위로 메모리 올리기
}

async function readAsync(path: any) {
    return fs.createReadStream(path)
}