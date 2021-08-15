import { db, DBRow, DBStatus } from "../../common/database"
import { dbErrorMsg } from "../../common/define"
import { errorPage } from "../routes/error"


export async function getUserId(userUuid: any, res: any) {
    const [[row]]: DBRow = await db.query(
        "SELECT `id` FROM `user` WHERE `user_uuid` = ?",
        [userUuid])

    if (row === undefined) {
        errorPage(dbErrorMsg.undefined, res)
    }

    return row
}

export async function getUserGoods(userId: any, res: any) {
    const [[row]]: DBRow = await db.query(
        "SELECT `gold`, `diamond`, `diamond_google`, `diamond_apple` FROM `user_goods` " +
        "WHERE `user_id` = ?",
        [userId])

    if (row === undefined) {
        errorPage(dbErrorMsg.undefined, res)
    }

    return row
}

export async function getUserGames(userId: any, res: any) {
    const [[row]]: DBRow = await db.query(
        "SELECT `total_highest_trophy`, `trophy_reward_step` FROM `user_game` " +
        "WHERE `user_id` = ?",
        [userId])

    if (row === undefined) {
        errorPage(dbErrorMsg.undefined, res)
    }

    return row
}

export async function addUserGoods(userId: any, gold: any, diamond: any, res: any) {
    const [result]: DBStatus = await db.query(
        "UPDATE `user_goods` " +
        "SET `gold` = `gold` + ?, `diamond` = `diamond` + ? " +
        "WHERE `user_id` = ?",
        [gold, diamond, userId])

    if (result.affectedRows === 0) {
        errorPage(result.message, res)
    }
}