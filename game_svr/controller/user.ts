import { Cookie, newSession } from "../../common/session"
import { success } from "../../common/util"
import { ErrorCode } from "../../packet/errorCode"
import { RequestLogin, RequestUserStatus, ResponseLogin, ResponseUserStatus } from "../../packet/gamepacket"

import * as queryUser from "../query/user"

export async function Login(cookie: Cookie, param: RequestLogin): Promise<ResponseLogin> {
    // 1.request param check
    console.log("Login")

    // 2.server logic (이 부분이 너무 복잡해지면 안된다.)
    // - mysql
    // - redis
    const userData = await queryUser.selectUserData(param)
    await newSession(cookie, userData.userId, param.platform)

    // 3. 로직 처리에 대한 결과 Log

    // 4. response
    return success()
}

export async function UserStatus(cookie: Cookie, param: RequestUserStatus): Promise<ResponseUserStatus> {
   return success()
}