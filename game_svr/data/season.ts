import { csvFiles, dbErrorMsg } from "../../common/define"
import { LoggerGame } from "../../common/logger"
import { dbError } from "../../common/util"
import { AllTableList } from "./interface"

// head
// SeasonId,StartTime,EndTime
// (0 ~ 2)
const csvFileName = csvFiles[1]

export async function searchSeasonAll() {
    // const table = AllTableList.find(e => e.name === csvFileName);
    return
}

export async function searchSeason(seasonId: number) {
    const table = AllTableList.find(e => e.name === csvFileName)
    if (table === undefined) {
        throw dbError(`${dbErrorMsg.csvFileErr},${csvFileName}`)
    }

    const headRow = table.data[0]
    LoggerGame.info(`${csvFileName} head row data is ${headRow}`)

    // row
    const dataRow = table.data[5]
    LoggerGame.info(`${csvFileName} row 5 data is ${dataRow}`)

    // 반복문을 사용한 방법.
    table.data.forEach(e => {
        // LoggerGame.info(`cols ${e[0]}`); // 0 : season col
    })

    // 시간 기준으로 찾아야 함
    const now = new Date()
    const nowLocalStr = now.toLocaleTimeString()
    LoggerGame.info(`localTime ${nowLocalStr}`)

    const rowStartTime = table.data[5][1]
    const rowEndTime = table.data[5][2]

    if (rowStartTime <= nowLocalStr) {
        LoggerGame.info(`rowStartTime < now`)
    }

    LoggerGame.info(`${csvFileName} starttime:${rowStartTime}, endtime:${rowEndTime}`)
    if (rowStartTime <= now) {
        LoggerGame.info(`rowStartTime <= now`)
    } else {
        LoggerGame.info(`rowStartTime > now`)
    }

    const seasonIdStartTime = table.data[seasonId][1]
    LoggerGame.info(`${csvFileName} seasonId ${seasonId} starttime is ${seasonIdStartTime}`)

    return
}

// TODO: 실제 컨텐츠 로직에 필요한 서칭 메서드