import { db, DBRow } from "../../common/database"

export async function getCurrentTime() {
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