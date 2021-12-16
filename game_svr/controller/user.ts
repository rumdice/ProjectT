import { Cookie, newSession } from "../../common/session"
import { successGame } from "../../common/util"
import { RequestLogin, RequestUserStatus, ResponseLogin, ResponseUserStatus } from "../../packet/gamepacket"

import * as queryUser from "../query/user"

export async function Login(cookie: Cookie, param: RequestLogin): Promise<ResponseLogin> {
    // 1.request param check

    // 2.server logic (이 부분이 너무 복잡해지면 안된다.)
    // - mysql
    // - redis
    const userData = await queryUser.selectUserData(param)

    const platform = "android" // param.platform으로 패킷으로 받아야 함
    await newSession(cookie, userData.userId, platform)

    // 3. 로직 처리에 대한 결과 Log

    // 4. response
    return successGame()
}

export async function UserStatus(cookie: Cookie, param: RequestUserStatus): Promise<ResponseUserStatus> {
    // ...
    return successGame()
}