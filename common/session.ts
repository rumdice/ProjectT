import redis from "redis";
import { ErrorCode } from "../packet/commonPacket";
import { MAX_CNT_GENERATE_TOKEN, SESSION_TTL, USER_TTL } from "./define";
import { panic, randomInt } from "./util";

// TODO: Redis 기반의 세션 생성 및 관리
// 요청이 있을 때마다 redis 접근의 비용이 너무 비쌈. 좀 정형화되고 가벼운 방법을 찾기

export type Cookie = any;
type CookieInternal = [sessionToken: number, seq: number];

declare const redisClient: redis.RedisClient;

function sessionKeyOf(sessionToken: number): string {
    return `session:${sessionToken}`;
}


function doAsync<T>(operation: (cb: redis.Callback<T>) => void): Promise<T> {
    return new Promise((resolve, reject) =>
        operation((err, reply) => {
            if (err) reject(err);
            resolve(reply);
        })
    );
}

export async function updateSession(cookie: Cookie): Promise<string | undefined> {
    const [sessionToken,]: CookieInternal = cookie;

    if (sessionToken == null)
        return undefined;

    const sessionKey = sessionKeyOf(sessionToken);
    const [newSeq] = await Promise.all([
        doAsync<number>(cb => redisClient.hincrby(sessionKey, "seq", 1, cb)),
        doAsync<number>(cb => redisClient.expire(sessionKey, SESSION_TTL, cb))]);

    return `${sessionToken};${newSeq}`;
}

export async function newSession(outCookie: Cookie, user_id: number, platform: string) {
    if (outCookie == null)
        return;

    async function acquireNewSessionToken(user_id: number) {
        const userIdString = user_id.toString();
        let tryCount = MAX_CNT_GENERATE_TOKEN;
        while (tryCount--) {
            const newToken = randomInt(1, 2147483647);
            const result = await doAsync<number>(cb => redisClient.hsetnx(sessionKeyOf(newToken), 'id', userIdString, cb));
            if (result === 1)
                return newToken;
        }
    }

    const userKey = `user:${user_id}`;
    const oldSessionToken = Number.parseInt(<string>await doAsync<string | null>(cb =>
        redisClient.get(userKey, cb)));

    if (Number.isInteger(oldSessionToken)) {
        await doAsync(cb => redisClient.del(sessionKeyOf(oldSessionToken), cb));
    }

    const sessionToken = await acquireNewSessionToken(user_id);
    if (sessionToken === undefined)
        throw panic(ErrorCode.InternalError, 'newToken');

    await doAsync(cb => redisClient.set(userKey, sessionToken.toString(),
        "EX", USER_TTL, cb));

    const sessionKey = sessionKeyOf(sessionToken);
    await doAsync(cb => redisClient.hset(sessionKey,
        'seq', '0', 'platform', platform, cb));
    await doAsync(cb => redisClient.expire(sessionKey, SESSION_TTL, cb));

    outCookie[0] = sessionToken;
    outCookie[1] = 0;
}



export function getCookie(header?: string): any {
    if (header !== undefined) {
        const [tokenString, seqString] = header.split(';', 2);
        const result = [Number.parseInt(tokenString), Number.parseInt(seqString)];

        if (Number.isInteger(result[0]) && Number.isInteger(result[1]))
            return result;
    }

    return [undefined, undefined];
}
