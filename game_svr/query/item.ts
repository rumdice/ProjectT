import { dbError } from "../../common/util"
import { db, DBRow } from "../../common/database"
import { dbErrorMsg } from "../../common/define"


export async function getUserItem(param: any) {
    const queryStr = "SELECT `id`, `userUid` FROM `user` WHERE user_uuid = ?"
    const queryParam = [param.user_uuid]

    const [[row]]: DBRow = await db.query(queryStr, queryParam)
    if (row === undefined) {
        throw dbError(dbErrorMsg.undefined)
    }

    return row
}
