import mysql, { FieldPacket, OkPacket, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { loadConfig } from "./util";
import { CONFIG_PATH_DB_DEV, CONFIG_PATH_DB_LIVE, CONFIG_PATH_DB_LOCAL} from "./define";

export declare const db: mysql.Pool;

export type DBRow = [RowDataPacket[], FieldPacket[]];
export type DBStatus = [OkPacket, FieldPacket[]];
export type DBResultSet = [ResultSetHeader, FieldPacket[]];

export type Queryable = mysql.Pool | mysql.Connection;

export const sqlformat = mysql.format;
export const CURRENT_TIMESTAMP = { toSqlString() { return 'CURRENT_TIMESTAMP()'; } };

export async function doTransaction<T>(callback: (conn: PoolConnection) => Promise<T>) {
    const conn = await db.getConnection();
    let result: T;

    try {
        await conn.beginTransaction();
        result = await callback(conn);
        await conn.commit();
    }
    catch (err) {
        await conn.rollback();
        throw err;
    }
    finally {
        conn.release();
    }

    return result;
}

export default {
    async init() {
        // pm2 env 
        let path = "";
        if (process.env.NODE_ENV === "dev") {
            path = CONFIG_PATH_DB_DEV;
        }
        else if (process.env.NODE_ENV === "live") {
            path = CONFIG_PATH_DB_LIVE;
        }
        else {
            path = CONFIG_PATH_DB_LOCAL;
        }

        const connectionPool = mysql.createPool(loadConfig(path));
        Object.defineProperty(module.exports, 'db', { value: connectionPool });

        console.log('database is initialized.');
    }
};
