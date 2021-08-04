import { Cookie, newSession } from "../../common/session";
import { successGame } from "../../common/util";
import * as gp from "../../packet/gamePacket";

import * as queryUser from "../query/user";
import * as queryUtil from "../query/util";

export async function login(cookie: Cookie, param: gp.RequestLogin): Promise<gp.ResponseLogin> {
    
    // TODO: check user exist query

    // 하드코딩
    // let userData = await queryUser.selectUserData(param);
    let userData = {
        userId : 1,
        userUid : "aabbcc",
        isNewUser : false,
    }

    // 하드코딩
    let platform = "android"; // param.platform으로 패킷으로 받아야 함
    await newSession(cookie, userData.userId, platform);

    return successGame();
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