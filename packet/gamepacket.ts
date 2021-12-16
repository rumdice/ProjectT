import { UserStatus } from "./entity";
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

export interface ResponseLogin extends BaseResponse {

}

export interface RequestUserStatus extends BaseRequest {
    uRL: string;
    userUid: string;
}

export interface ResponseUserStatus extends BaseResponse {
    userStatus: UserStatus;
}