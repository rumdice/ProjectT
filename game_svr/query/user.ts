import { dbError } from "../../common/util";
import { db, DBRow } from "../../common/database";
import { dbErrorMsg } from "../../common/define";


export async function checkIsExistUser(param: any) {
    let queryStr = "SELECT `id`, `userUid` FROM `user` WHERE user_uuid = ?";
    let queryParam = [param.user_uuid];

    const [[row]]: DBRow = await db.query(queryStr, queryParam);
    if (row === undefined) {
        throw dbError(dbErrorMsg.undefined);
    }

    return row;
}

export async function selectUserData(param: any) {
    
}

export async function updateUserData(param: any) {
    
}