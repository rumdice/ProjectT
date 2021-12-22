import { db, DBRow } from "../../common/database"
import { panic } from "../../common/util"
import { ErrorCode } from "../../packet/errorCode"

// TODO: 쿼리만 수행하고 비정상 발동시 에러 처리 및 로깅은 따로 안함.
// 에러 던지기를 여기저기서 하는게 좋은 구조인가?

export async function getUserAllItem(userId: number) {
    const query =
        "SELECT `itemTid`, `name`, `level`, `grade`, `breakable` " +
        "FROM `UserItems` WHERE `userUid` = ? "
    const param = [userId]

    const [rows]: DBRow = await db.query(query, param)
    if (rows === undefined || rows.length === 0) {
        throw panic(ErrorCode.DBError)
    }

    return rows.map(v => ({
        id: v.itemTid as number,
        name: v.name as string,
        level: v.level as number,
        grade: v.grade as number,
        breakable: v.breakable as boolean,
    }))
}

export async function UpgradeItem(params: any) {
    return
}