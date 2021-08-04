import { ErrorCode } from "./commonPacket";

export interface chatLog {
    userUid: string;
    msg: string;
    recv_time: Date;
}

export interface RequestBodyLogin extends RequestBody {
    userUid: string;
}

export interface RequestBodyChat extends RequestBody {
    userUid: string;
    chatMsg: string;
}

export interface RequestBodyChatLog extends RequestBody {
    userUid: string;
}

export interface ResponseBodyLogin extends ResponseBody {
    userUid: string;
}

export interface ResponseBodyChat extends ResponseBody {
    userUid: string;
    chatMsg: string;
}

export interface ResponseBodyChatLog extends ResponseBody {
    chatLogList: chatLog[];
}

export interface RequestLogin extends RequestPacket<RequestBodyLogin> {
    header: string;
}

export interface RequestChat extends RequestPacket<RequestBodyChat> {
    header: string;
}

export interface RequestChatLog extends RequestPacket<RequestBodyChatLog> {
    header: string;
}

export interface ResponseLogin extends ResponsePacket<ResponseBodyLogin> {

}

export interface ResponseChat extends ResponsePacket<ResponseBodyChat> {

}

export interface ResponseChatLog extends ResponsePacket<ResponseBodyChatLog> {

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