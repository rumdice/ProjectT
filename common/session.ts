import redis from "redis"
import { ErrorCode, Platform } from "../packet/errorCode"
import { CONFIG_PATH_GIT, CONFIG_REDIS_AWS, CONFIG_REDIS_LOCAL, MAX_CNT_GENERATE_TOKEN, SESSION_TTL, USER_TTL } from "./define"
import { loadConfig, panic, randomInt } from "./util"


export type Cookie = any
type CookieInternal = [sessionToken: number, seq: number]

declare const redisClient: redis.RedisClient

function sessionKeyOf(sessionToken: number): string {
    return `session:${sessionToken}`
}


function doAsync<T>(operation: (cb: redis.Callback<T>) => void): Promise<T> {
    return new Promise((resolve, reject) =>
        operation((err, reply) => {
            if (err) reject(err)
            resolve(reply)
        })
    )
}

export async function updateSession(cookie: Cookie): Promise<string | undefined> {
    const [sessionToken,]: CookieInternal = cookie

    if (sessionToken == null)
        return undefined

    const sessionKey = sessionKeyOf(sessionToken)
    const [newSeq] = await Promise.all([
        doAsync<number>(cb => redisClient.hincrby(sessionKey, "seq", 1, cb)),
        doAsync<number>(cb => redisClient.expire(sessionKey, SESSION_TTL, cb))])

    return `${sessionToken};${newSeq}`
}

export async function newSession(outCookie: Cookie, userId: number, platform: Platform) {
    if (outCookie == null)
        return

    async function acquireNewSessionToken(_userId: number) {
        const userIdString = _userId.toString()
        let tryCount = MAX_CNT_GENERATE_TOKEN
        while (tryCount--) {
            const newToken = randomInt(1, 2147483647)
            const result = await doAsync<number>(cb => redisClient.hsetnx(sessionKeyOf(newToken), 'id', userIdString, cb))
            if (result === 1)
                return newToken
        }
    }

    const userKey = `user:${userId}`
    const oldSessionToken = Number(await doAsync<string | null>(cb => redisClient.get(userKey, cb)) as string)

    if (Number.isInteger(oldSessionToken)) {
        await doAsync(cb => redisClient.del(sessionKeyOf(oldSessionToken), cb))
    }

    const sessionToken = await acquireNewSessionToken(userId)
    if (sessionToken === undefined)
        throw panic(ErrorCode.InternalError, 'newToken')

    await doAsync(cb => redisClient.set(userKey, sessionToken.toString(), "EX", USER_TTL, cb))

    const sessionKey = sessionKeyOf(sessionToken)
    await doAsync(cb => redisClient.hset(sessionKey, 'seq', '0', 'platform', Platform[platform], cb))
    await doAsync(cb => redisClient.expire(sessionKey, SESSION_TTL, cb))

    outCookie[0] = sessionToken
    outCookie[1] = 0
}



export function getCookie(header?: string): any {
    if (header !== undefined) {
        const [tokenString, seqString] = header.split(';', 2)
        const result = [Number(tokenString), Number(seqString)]

        if (Number.isInteger(result[0]) && Number.isInteger(result[1]))
            return result
    }

    return [undefined, undefined]
}


export default {
    init() {
        return new Promise((resolve: (value: void) => void, reject) => {

            let path = ""
            if (process.env.NODE_ENV === "dev") {
                path = CONFIG_REDIS_AWS
            }
            if (process.env.NODE_ENV === "local") {
                path = CONFIG_REDIS_LOCAL
            }


            const config = loadConfig(path)

            const client = redis.createClient({
                host: config.host,
                port: config.port,
                db: config.db,
            })

            client.on("error", (err) => {
                client.end(false)
                reject(err)
            }).on("ready", async () => {
                // tslint:disable-next-line: no-shadowed-variable
                await new Promise(resolve => client.config("SET", "SAVE", "", (err, reply) => {
                    (err) ? reject(err) : resolve(reply)
                }))

                Object.defineProperty(global, 'redisClient', { value: client })

                // tslint:disable-next-line: no-console
                console.log('session is initialized.')
                resolve()
            })
        })
    }
}
