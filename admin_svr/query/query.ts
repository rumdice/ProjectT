import { db, DBRow, DBStatus } from "../../common/database";
import { dbErrorMsg } from "../../common/define";
import { errorPage } from "../routes/error";


export async function getUserId(user_uuid: any, res: any) {
    const [[user_row]]: DBRow = await db.query(
        "SELECT `id` FROM `user` WHERE `user_uuid` = ?",
        [user_uuid]);

    if (user_row === undefined) {
        errorPage(dbErrorMsg.undefined, res);
    }

    return user_row;
}

export async function getUserGoods(user_id: any, res: any) {
    const [[user_goods_row]]: DBRow = await db.query(
        "SELECT `gold`, `diamond`, `diamond_google`, `diamond_apple` FROM `user_goods` " +
        "WHERE `user_id` = ?",
        [user_id]);

    if (user_goods_row === undefined) {
        errorPage(dbErrorMsg.undefined, res);
    }

    return user_goods_row;
}

export async function getUserGames(user_id: any, res: any) {
    const [[user_game_row]]: DBRow = await db.query(
        "SELECT `total_highest_trophy`, `trophy_reward_step` FROM `user_game` " +
        "WHERE `user_id` = ?",
        [user_id]);

    
    if (user_game_row === undefined) {
        errorPage(dbErrorMsg.undefined, res);
    }

    return user_game_row;
}

export async function addUserGoods(user_id: any, gold: any, diamond: any, res: any) {
    const [result]: DBStatus = await db.query(
        "UPDATE `user_goods` " +
        "SET `gold` = `gold` + ?, `diamond` = `diamond` + ? " +
        "WHERE `user_id` = ?",
        [gold, diamond, user_id]);

    if (result.affectedRows === 0) {
        errorPage(result.message, res);
    }
}