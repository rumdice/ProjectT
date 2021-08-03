import { createLogger, format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { loadLogFile, loadLogDir } from "./util";

const { combine, timestamp, printf } = format;

const gameServerLogDir = '../logs/game';
const adminServerLogDir = '../logs/admin';
const chatServerLogDir = '../logs/chat';
const days = 5; // 30일치 로그 - 거지라서 aws 요금 관련. 로그 파일 갯수 줄이기

export enum logLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'dedug'
}

// TODO: 이런게 타입스트립트 답고, 함수형 프로그래밍 다운 것일까? logFormat이라는 함수를 값 처럼 취급
const logFormat = printf(info => {
    if (process.env.NODE_ENV === "local") {
        console.log(`${info.timestamp} - ${info.level}: ${info.message}`);
    }

    return `${info.timestamp} - ${info.level}: ${info.message}`;
});

// 게임서버
export const LoggerGame = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),

    transports: [
        new winstonDaily({
            level: logLevel.INFO,
            handleExceptions: true,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: gameServerLogDir + '/info',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),

        new winstonDaily({
            level: logLevel.ERROR,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: gameServerLogDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),
    ],
});

export function readGameErrorLog(date: string) {
    let path = gameServerLogDir + `/error/${date}.log`;
    return loadLogFile(path);
}

export function readGameInfoLog(date: string) {
    let path = gameServerLogDir + `/info/${date}.log`;
    return loadLogFile(path);
}

export function readGameErrorDir() {
    let path = gameServerLogDir + '/error';
    return loadLogDir(path);
}

// 운영서버
export const LoggerAdmin = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),

    transports: [
        new winstonDaily({
            level: logLevel.INFO,
            handleExceptions: true,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: adminServerLogDir + '/info',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),

        new winstonDaily({
            level: logLevel.ERROR,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: adminServerLogDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),
    ],
});

export function readAdminErrorLog(date: string) {
    let path = adminServerLogDir + `/error/${date}.log`;
    return loadLogFile(path);
}

export function readAdminInfoLog(date: string) {
    let path = adminServerLogDir + `/info/${date}.log`;
    return loadLogFile(path);
}

export function readAdminErrorDir() {
    let path = adminServerLogDir + '/error';
    return loadLogDir(path);
}

// 채팅서버
export const LoggerChat = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),

    transports: [
        new winstonDaily({
            level: logLevel.INFO,
            handleExceptions: true,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: chatServerLogDir + '/info',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),

        new winstonDaily({
            level: logLevel.ERROR,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: chatServerLogDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),
    ],
});

export function readChatErrorLog(date: string) {
    let path = chatServerLogDir + `/error/${date}.log`;
    return loadLogFile(path);
}

export function readChatInfoLog(date: string) {
    let path = chatServerLogDir + `/info/${date}.log`;
    return loadLogFile(path);
}

export function readChatErrorDir() {
    let path = chatServerLogDir + '/error';
    return loadLogDir(path);
}