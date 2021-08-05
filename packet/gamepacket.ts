import { ErrorCode } from "./common";

export interface BaseRequest {

}

export interface BaseResponse {
    error: ErrorCode;
}

export interface RequestTest extends BaseRequest {
    uRL: string;
    userUid: string;
}

export interface ResponseTest extends BaseResponse {
    serverMsg: string;
}

export interface RequestBodyLogin extends RequestBody {
    userUid: string;
}

export interface RequestBodyTest extends RequestBody {
    userUid: string;
}

export interface ResponseBodyLogin extends ResponseBody {
    userUid: string;
}

export interface ResponseBodyTest extends ResponseBody {
    userUid: string;
}

export interface RequestLogin extends RequestPacket<RequestBodyLogin> {
    header: string;
}

export interface RequestTest extends RequestPacket<RequestBodyTest> {
    header: string;
}

export interface ResponseLogin extends ResponsePacket<ResponseBodyLogin> {

}

export interface ResponseTest extends ResponsePacket<ResponseTest> {

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