import * as mysql from "mysql2/promise"
import { CONFIG_MYSQL_DEV, CONFIG_MYSQL_LOCAL } from "./define"
import { loadConfig } from "./util"

export declare const db: mysql.Pool

export type DBRow = [mysql.RowDataPacket[], mysql.FieldPacket[]]
export type DBStatus = [mysql.OkPacket, mysql.FieldPacket[]]
export type DBResultSet = [mysql.ResultSetHeader, mysql.FieldPacket[]]
export type Queryable = mysql.Pool | mysql.Connection

export const sqlformat = mysql.format
export const CURRENT_TIMESTAMP = { toSqlString() { return 'CURRENT_TIMESTAMP()' } }

export async function doTransaction<T>(callback: (conn: mysql.PoolConnection) => Promise<T>) {
    const conn = await db.getConnection()
    let result: T

    try {
        await conn.beginTransaction()
        result = await callback(conn)
        await conn.commit()
    }
    catch (err) {
        await conn.rollback()
        throw err
    }
    finally {
        conn.release()
    }

    return result
}

export default {
    async init() {
        // pm2 env
        let path = ""
        if (process.env.NODE_ENV === "dev") {
            path = CONFIG_MYSQL_DEV
        }
        if (process.env.NODE_ENV === "local") {
            path = CONFIG_MYSQL_LOCAL
        }

        const connectionPool = mysql.createPool(loadConfig(path))
        Object.defineProperty(module.exports, 'db', { value: connectionPool })

        console.log(`database is initialized. env:${process.env.NODE_ENV}`)
    }
}
