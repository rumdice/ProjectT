import { createLogger, format } from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import { loadLogFile, loadLogDir } from "./util"

const { combine, timestamp, printf } = format

const gameServerLogDir = '../logs/game'
const adminServerLogDir = '../logs/admin'
const chatServerLogDir = '../logs/chat'
const rankServerLogDir = '../logs/rank'
const days = 5 // n일치 로그, 거지라서 ㅠㅠ aws 요금 관련 로그 파일 갯수 줄이기

export enum logLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'dedug'
}

// TODO: 이런게 타입스트립트 답고, 함수형 프로그래밍 다운 것일까? logFormat이라는 함수를 값 처럼 취급
const logFormat = printf(info => {
    if (process.env.NODE_ENV === "local") {
        // tslint:disable-next-line: no-console
        console.log(`${info.timestamp} - ${info.level}: ${info.message}`)
    }

    return `${info.timestamp} - ${info.level}: ${info.message}`
})

// TODO: 똑같은 형태가 반복되므로 계층화 필요
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
})

export function readGameErrorLog(date: string) {
    return loadLogFile(gameServerLogDir + `/error/${date}.log`)
}

export function readGameInfoLog(date: string) {
    return loadLogFile(gameServerLogDir + `/info/${date}.log`)
}

export function readGameErrorDir() {
    return loadLogDir(gameServerLogDir + '/error')
}


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
})

export function readAdminErrorLog(date: string) {
    return loadLogFile(adminServerLogDir + `/error/${date}.log`)
}

export function readAdminInfoLog(date: string) {
    return loadLogFile(adminServerLogDir + `/info/${date}.log`)
}

export function readAdminErrorDir() {
    return loadLogDir(adminServerLogDir + '/error')
}



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
})

export function readChatErrorLog(date: string) {
    return loadLogFile(chatServerLogDir + `/error/${date}.log`)
}

export function readChatInfoLog(date: string) {
    return loadLogFile(chatServerLogDir + `/info/${date}.log`)
}

export function readChatErrorDir() {
    return loadLogDir(chatServerLogDir + '/error')
}


// TODO : 으윽...어떻게 좀 해야겠어!
export const LoggerRank = createLogger({
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
            dirname: rankServerLogDir + '/info',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),

        new winstonDaily({
            level: logLevel.ERROR,
            json: false,
            datePattern: 'YYYY-MM-DD',
            dirname: rankServerLogDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: days,
            zippedArchive: false,
        }),
    ],
})