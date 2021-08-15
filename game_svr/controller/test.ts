import { Cookie, newSession } from "../../common/session"
import { successGame } from "../../common/util"

import * as gp from "../../packet/gamepacket"
import * as queryUtil from "../query/util"

// 컨텐츠랑 관련 없는 코드 테스트 컨트롤러
export async function test(cookie: Cookie, param: any): Promise<gp.BaseResponse> {
    const time = await queryUtil.getCurrentTime()
    const time2 = time.time.getTime()
    const now = new Date()

    // aa = 1;
    // var obj1 = {};
    // Object.defineProperty(obj1, "x", { value: 42, writable: false });
    // obj1.x = 9; // TypeError 발생

    return successGame()
}