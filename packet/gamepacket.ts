import { ErrorCode } from "./errorCode";

export interface BaseRequest {

}

export interface BaseResponse {
    error: ErrorCode;
    message: string;
}

export interface RequestTest extends BaseRequest {
    uRL: string;
    userUid: string;
}

export interface ResponseTest extends BaseResponse {

}

export interface RequestLogin extends BaseRequest {
    uRL: string;
    userUid: string;
    userName: string;
}

export interface ResponseTest extends BaseResponse {

}