import { ErrorCode } from "./commonpacket";

export interface RequestBodyLogin extends RequestBody {
    userUid: string;
}

export interface ResponseBodyLogin extends ResponseBody {
    userUid: string;
}

export interface RequestLogin extends RequestPacket<RequestBodyLogin> {
    header: string;
}

export interface ResponseLogin extends ResponsePacket<ResponseBodyLogin> {

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

export interface ResponsePacket<T> extends ResponsePacketBase {
    body: T;
}

export interface RequestPacket<T> extends RequestPacketBase {
    body: T;
}