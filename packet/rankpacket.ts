import { ErrorCode } from "./errorCode";

export interface RequestBodyUpdateRankScore extends RequestBody {
    userUid: string;
    seasonId: number;
    score: number;
}

export interface RequestBodyGetRankList extends RequestBody {
    userUid: string;
    seasonId: number;
}

export interface ResponseBodyUpdateRankScore extends ResponseBody {
    userUid: string;
}

export interface ResponseBodyGetRankList extends ResponseBody {
    seasonRankList: RankSeasonData[];
}

export interface RequestUpdateRankScore extends RequestPacket<RequestBodyUpdateRankScore> {
    header: string;
}

export interface RequestGetRankList extends RequestPacket<RequestBodyGetRankList> {
    header: string;
}

export interface ResponseUpdateRankScore extends ResponsePacket<ResponseBodyUpdateRankScore> {

}

export interface ResponseGetRankList extends ResponsePacket<ResponseBodyGetRankList> {

}

export interface RankSeasonData {
    seasonId: number;
    userUid: string;
    userName: string;
    score: number;
}

export interface RequestBody {

}

export interface ResponseBody {
    error: ErrorCode;
}

export interface RequestPacketBase {
    header: string;
}

export interface ResponsePacketBase {
    header: string;
}

export interface RequestPacket<T> extends RequestPacketBase {
    body: T;
}

export interface ResponsePacket<T> extends ResponsePacketBase {
    body: T;
}