export enum ErrorCode {
    Success = 0,
    InvalidSession = 1,
    InvalidParam = 2,
    MissingParam = 3,
    DBError = 100,
    InternalError = 200,
    Undefinded = -1
}

export interface BaseRequest {

}

export interface BaseResponse {
    error: ErrorCode;
}