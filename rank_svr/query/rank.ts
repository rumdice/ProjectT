import { dbError } from "../../common/util"
import { db, DBRow, DBStatus } from "../../common/database"
import { dbErrorMsg } from "../../common/define"

export async function resetSeasonRank() {
    // TODO: (컨텐츠)시즌 랭킹 리셋하는 쿼리
    const queryStr = ""
    const queryParam = [0]

    const [status]: DBStatus = await db.query(queryStr, queryParam)
    if (status.affectedRows === 0) {
        throw dbError(status.message)
    }
}

export async function calcSeasonRank() {
     // TODO: (컨텐츠)시즌 랭킹 정산하는 쿼리
    const queryStr = ""
    const queryParam = [0]

    const [status]: DBStatus = await db.query(queryStr, queryParam)
    if (status.affectedRows === 0) {
        throw dbError(status.message)
    }
}