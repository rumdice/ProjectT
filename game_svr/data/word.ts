import { csvFiles, dbErrorMsg } from "../../common/define"
import { LoggerGame } from "../../common/logger"
import { dbError } from "../../common/util"
import { AllTableList } from "./interface"

// head
// Id,Word
// (0 ~ 1)
const csvFileName = csvFiles[2]

export async function searchStringFilterAll() {
    // const seasonTable = AllTableList.find(e => e.name === fileName);
    return
}

export async function searchStringFilter(word: string) {
    const table = AllTableList.find(e => e.name === csvFileName)
    if (table === undefined) {
        throw dbError(`${dbErrorMsg.csvFileErr},${csvFileName}`)
    }

    const headRow = table.data[0] // head row
    LoggerGame.info(`${csvFileName} head row data is ${headRow}`)

    const data = table.data[5] // row 기준.
    LoggerGame.info(`${csvFileName} row 5 data is ${data}`)

    const rowToData = table.data[5][1]
    LoggerGame.info(`${csvFileName} data is ${rowToData}`)

    return
}

// TODO: 실제 컨텐츠 로직에 필요한 서칭 메서드
export async function isExistWord(word: string) {
    const table = AllTableList.find(e => e.name === csvFileName)
    if (table === undefined) {
        throw dbError(`${dbErrorMsg.csvFileErr},${csvFileName}`)
    }

    let isExist = false

    // col 기준
    table.data.forEach(async e => {
        if (e[1] === word) {
            LoggerGame.info(`e[1] ${e[1]} word ${word}`)
            isExist = true
        }
    })

    return isExist
}