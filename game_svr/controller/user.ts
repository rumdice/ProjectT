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
    console.log("UserStatus")

    // 단순한 케이스.
    // 로직이 복잡한 경우는?

    const dbResult = await queryUser.getUserStatus(param)

    // ...
    // ...

    const resp = {
        error: ErrorCode.Success,
        message: "",
        userStatus : dbResult,
    }

    // TODO: 네이밍 수정. 성공, 실패
    // success함수 개선.
    // 아니면 에러처리.
    return success(resp)
}