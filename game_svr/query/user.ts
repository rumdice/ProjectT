import { dbError } from "../../common/util"
import { db, DBRow } from "../../common/database"
import { dbErrorMsg } from "../../common/define"


export async function checkIsExistUser(param: any) {
    const queryStr = "SELECT `id`, `userUid` FROM `user` WHERE user_uuid = ?"
    const queryParam = [param.user_uuid]

    const [[row]]: DBRow = await db.query(queryStr, queryParam)
    if (row === undefined) {
        throw dbError(dbErrorMsg.undefined)
    }

    return row
}

export async function selectUserData(param: any) {

    // example query

    return {
        userId: 1,
        userUid: "aabbcc",
        isNewUser: false,
    }
}

export async function updateUserData(param: any) {
    return
}

export async function getUserStatus(param: any) {
    const queryStr = "SELECT `id`, `userUid` FROM `user` WHERE user_uuid = ?"
    const queryParam = [param.user_uuid]

    const [[row]]: DBRow = await db.query(queryStr, queryParam)
    if (row === undefined) {
        throw dbError(dbErrorMsg.undefined)
    }

    const now = new Date()
    return {
        name: "",
        level: 1,
        lastLogin: now,
        create: now,
    }
}