import { ErrorCode } from "./errorCode";

export interface BaseRequest {
    userUid: string;
}

export interface BaseResponse {
    error: ErrorCode;
    message: string;
}

export interface RequestChatLogin extends BaseRequest {
    uRL: string;
    userName: string;
}

export interface ResponseChatLogin extends BaseResponse {

}

export interface RequestNormalChat extends BaseRequest {
    userUid: string;
    sendMessage: string;
}

export interface RequestBodyChat extends BaseResponse {
    userUid: string;
    recvMessage: string;
}