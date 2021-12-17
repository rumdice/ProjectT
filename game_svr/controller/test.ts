import { Cookie, newSession } from "../../common/session"
import { successGame } from "../../common/util"

import * as gp from "../../packet/gamepacket"
import * as queryUtil from "../query/util"

export async function Test(cookie: Cookie, param: any): Promise<gp.BaseResponse> {
    console.log("Test")
    const time = await queryUtil.getCurrentTime()
    const time2 = time.time.getTime()
    const now = new Date()

    return successGame()
}