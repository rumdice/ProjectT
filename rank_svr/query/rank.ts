import { db, DBRow, DBStatus } from "../../common/database"
import { dbErrorMsg } from "../../common/define"
import { panic } from "../../common/util"
import { ErrorCode } from "../../packet/errorCode"
import { RankSeasonData } from "../../packet/rankpacket"

export async function resetSeasonRank() {
    // TODO: (컨텐츠)시즌 랭킹 리셋하는 쿼리
    const queryStr = ""
    const queryParam = [0]

    const [status]: DBStatus = await db.query(queryStr, queryParam)
    if (status.affectedRows === 0) {
        throw panic(ErrorCode.DBError)
    }
}

export async function calcSeasonRank() {
    // TODO: (컨텐츠)시즌 랭킹 정산하는 쿼리
    const queryStr = ""
    const queryParam = [0]

    const [status]: DBStatus = await db.query(queryStr, queryParam)
    if (status.affectedRows === 0) {
        throw panic(ErrorCode.DBError)
    }
}


export async function getSeasonRankList(param: any) {
    // TODO: (컨텐츠)시즌 랭커 목록 구하는 정산하는 쿼리, 시간은 아니고 해당 시즌의 정산된 랭킹 점수기준 랭커를 구한다 가정
    // 정확히 하려면 시즌별 테이블 나뉘는게 정석, 시즌별 랭킹 데이터가 엄청 쌓이기 때문
    const queryStr = "SELECT seasonId, userUid, userName, score FROM `rank` WHERE seasonId = ?"
    const queryParam = [param.seasonId]

    const [rows]: DBRow = await db.query(queryStr, queryParam)
    if (rows.length === 0) {
        throw panic(ErrorCode.DBError)
    }

    return makeSeasonRankList(rows)
}

export async function resetRank() {
    return
}


function makeSeasonRankList(datas: any[]) {
    const rankList: RankSeasonData[] = []

    datas.forEach(e => {
        const rank: RankSeasonData = {
            seasonId: e.userUid,
            userUid: e.userUid,
            userName: e.userName,
            score: e.score,
        }

        rankList.push(rank)
    })

    return rankList
}

export async function updateSeasonRankScore(param: any) {
    const queryStr = "UPDATE `rank` SET score = ? WHERE userUid = ? AND seasonId = ?"
    const queryParam = [param.score, param.userUid,  param.seasonId]

    const [status]: DBStatus = await db.query(queryStr, queryParam)
    if (status.affectedRows === 0) {
        throw panic(ErrorCode.DBError)
    }
}