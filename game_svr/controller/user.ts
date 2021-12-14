import { Cookie, newSession } from "../../common/session"
import { successGame } from "../../common/util"
import * as gp from "../../packet/gamepacket"

import * as queryUser from "../query/user"
import * as queryUtil from "../query/util"

export async function login(cookie: Cookie, param: gp.RequestLogin): Promise<gp.ResponseLogin> {
    // 1.request param check

    // 2.server logic
    // - mysql
    // - redis
    const userData = await queryUser.selectUserData(param)
    const platform = "android" // param.platform으로 패킷으로 받아야 함
    await newSession(cookie, userData.userId, platform)

    // 3. Log

    // 4. response
    return successGame()
}


// export async function loadUserData(cookie: Cookie, param: RequestLoadUserData): Promise<ResponseLoadUserData> {
//     let userData = await queryUser.selectUserData(param);
//     let response = {
//         user_data: userData,
//     };
//     return successGame(response);
// }


// export async function saveUserData(cookie: Cookie, param: RequestSaveUserData): Promise<BaseResponse> {
//     await queryUser.checkIsExistUser(param);
//     await queryUser.updateUserData(param);
//     return successGame();
// }