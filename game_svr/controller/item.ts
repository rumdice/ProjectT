import { Cookie, newSession } from "../../common/session"
import { successGame } from "../../common/util"
import { RequestItemInfo, RequestItemUpgrade, ResponseItemInfo, ResponseItemUpgrade } from "../../packet/gamepacket"

import * as queryItem from "../query/item"

export async function ItemInfo(cookie: Cookie, param: RequestItemInfo): Promise<ResponseItemInfo> {

    // ...
    return successGame()
}

export async function ItemUpgrade(cookie: Cookie, param: RequestItemUpgrade): Promise<ResponseItemUpgrade> {
    // ...
    return successGame()
}