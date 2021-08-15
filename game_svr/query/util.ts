import { db, DBRow } from "../../common/database"

export async function getCurrentTime() {
    // RDS, EC2의 시간 셋팅값에 따라 new Date()와 값이 같을 수도 있음.
    const CURRENT_TIMESTAMP = { toSqlString() { return 'CURRENT_TIMESTAMP()' } }
    const [[row]]: DBRow = await db.query("SELECT ? AS `time`", CURRENT_TIMESTAMP)

    return row
}

export async function isExistBadWord(word: string) {
    const queryStr = "SELECT id FROM `stringTable` WHERE `word` LIKE ?"
    const queryParam = [word]

    const [[row]]: DBRow = await db.query(queryStr, queryParam)
    return (row === undefined) ? false : true
}