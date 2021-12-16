import { Item, UserStatus } from "./entity";
import { ErrorCode, Platform } from "./errorCode";

export interface BaseRequest {
    userUid: string;
}

export interface BaseResponse {
    error: ErrorCode;
    message: string;
}

export interface RequestTest extends BaseRequest {
    uRL: string;
}

export interface ResponseTest extends BaseResponse {

}

export interface RequestLogin extends BaseRequest {
    uRL: string;
    userName: string;
    platform: Platform;
}

export interface ResponseLogin extends BaseResponse {

}

export interface RequestUserStatus extends BaseRequest {
    uRL: string;
}

export interface ResponseUserStatus extends BaseResponse {
    userStatus: UserStatus;
}

export interface RequestItemInfo extends BaseRequest {
    uRL: string;
}

export interface ResponseItemInfo extends BaseResponse {
    items: Item[];
}

export interface RequestItemUpgrade extends BaseRequest {
    uRL: string;
}

export interface ResponseItemUpgrade extends BaseResponse {

}