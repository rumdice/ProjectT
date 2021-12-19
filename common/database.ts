import * as mysql from "mysql2/promise"
import { loadConfig } from "./util"
import path from 'path'


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
        let sqlConfigPath = ""
        if (process.env.NODE_ENV === "dev") {
            sqlConfigPath = path.join(__dirname, '../', '../', '/config', '/mysql_aws.json')
        }
        if (process.env.NODE_ENV === "local") {
            sqlConfigPath = path.join(__dirname, '../', '../', '/config', '/mysql_local.json')
        }

        const connectionPool = mysql.createPool(loadConfig(sqlConfigPath))
        Object.defineProperty(module.exports, 'db', { value: connectionPool })

        console.log(`database is initialized. env:${process.env.NODE_ENV}`)
    }
}
