import * as queryRank from "../query/rank"
import * as rp from "../../packet/rankpacket"
import { successRank } from "../../common/util"
import { ErrorCode } from "../../packet/common"


export async function RequestGetRankList(client: any, param: rp.RequestBodyGetRankList): Promise<rp.ResponseGetRankList> {
    // check recv param

    // proc
    const rankList = await queryRank.getSeasonRankList(param)

    // make response packet
    const resp: rp.ResponseBodyGetRankList = {
        error: ErrorCode.Success,
        seasonRankList: rankList
    }

    const respPacket: rp.ResponseGetRankList = {
        header: "ResponseGetRankList",
        body: resp,
    }

    // send resp
    return successRank(respPacket)
}

export async function RequestUpdateRankScore(client: any, param: rp.RequestBodyUpdateRankScore): Promise<rp.ResponseUpdateRankScore> {
    // check recv param

    // proc
    await queryRank.updateSeasonRankScore(param)

    // make response packet
    const resp: rp.ResponseBodyUpdateRankScore = {
        error: ErrorCode.Success,
        userUid: param.userUid, // echo resp
    }

    const respPacket: rp.ResponseUpdateRankScore = {
        header: "ResponseUpdateRankScore",
        body: resp,
    }

    // send resp
    return successRank(respPacket)
}