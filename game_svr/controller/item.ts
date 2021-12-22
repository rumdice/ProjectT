import { acquireSession, Cookie, newSession } from "../../common/session"
import { success } from "../../common/util"
import { ErrorCode } from "../../packet/errorCode"
import { RequestItemInfo, RequestItemUpgrade, ResponseItemInfo, ResponseItemUpgrade } from "../../packet/gamepacket"
import { Item } from "../model/Item"

export async function ItemInfo(cookie: Cookie, param: RequestItemInfo): Promise<ResponseItemInfo> {
    console.log("ItemInfo")
    const [userId] = await acquireSession(cookie)

    const item = new Item(userId)
    const itemInfo = await item.GetInfo() // 복잡한 로직은 이 안에서.

    const resp = {
        error: ErrorCode.Success,
        message: "",
        items : itemInfo,
    }

    return success(resp)
}

export async function ItemUpgrade(cookie: Cookie, param: RequestItemUpgrade): Promise<ResponseItemUpgrade> {
    // ...
    return success()
}