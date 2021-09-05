import { csvFiles, dbErrorMsg } from "../../common/define"
import { LoggerGame } from "../../common/logger"
import { dbError } from "../../common/util"
import { AllTableList } from "./interface"

// head
// Id,lv,Point
// (0 ~ 2)

const csvFileName = csvFiles[0]

export async function searchLevelAll() {
    // const table = AllTableList.find(e => e.name === csvFileName);
    return
}

export async function searchLevel(level: number) {
    const table = AllTableList.find(e => e.name === csvFileName)
    if (table === undefined) {
        throw dbError(`${dbErrorMsg.csvFileErr},${csvFileName}`)
    }

    // 기본은 행, 열 기준으로 찾는다.
    const headRow = table.data[0]
    LoggerGame.info(`${csvFileName} head row data is ${headRow}`)

    const data = table.data[5]
    LoggerGame.info(`${csvFileName} row 5 data is ${data}`)

    const row5StartTime = table.data[5][1]
    LoggerGame.info(`${csvFileName} row 5 starttime is ${row5StartTime}`)

    const levelData = table.data[level][1]
    LoggerGame.info(`${csvFileName} Level ${level} Level is ${levelData}`)

    return
}


// TODO: 실제 컨텐츠 로직에 필요한 서칭 메서드
export async function getLevelData(id: number) {
    const table = AllTableList.find(e => e.name === csvFileName)
    if (table === undefined) {
        throw dbError(`${dbErrorMsg.csvFileErr},${csvFileName}`)
    }

    const point = table.data[id].pop()
    return point
}