import * as packet from "../../packet/gamepacket"
import * as entity from "../../packet/entity"
import * as itemQuery from "../query/item"
import { RequestLogin } from "../../chat_svr/controller/user"
import { ErrorCode } from "../../packet/errorCode"
import { panic } from "../../common/util"
import { dbErrorMsg } from "../../common/define"

// 아이템에 대한 요소 + 행동
// 인터페이스는 서버 클라 공유 - 패킷
export class Item {

    private userId: number

    constructor(userId: number) {
        this.userId = userId
    }

    public async GetInfo(): Promise<entity.Item[]> {
        // 로직 처리 부분...

        // redis 처리

        // 서버 로직

        // query 처리
        const dbResult = await itemQuery.getUserAllItem(this.userId)
        if (dbResult === undefined) {
            throw panic(ErrorCode.DBError, dbErrorMsg.length0)
        }

        const result = dbResult
        return result
    }

    public async Upgrade(params: any): Promise<void> {
        return await itemQuery.UpgradeItem(params)
    }
}