"use strict";
// "use strict";
// import { createLogger, format } from 'winston';
// import winstonDaily from 'winston-daily-rotate-file';
// import { loadLogFile, loadLogDir } from "./util";
// const { combine, timestamp, printf } = format;
// const apiServerLogDir = './logs/api';
// const adminServerLogDir = './logs/admin';
// const chatServerLogDir = './logs/chat';
// const days = 30; // 30일치 로그
// const logFormat = printf(info => {
//     // 디버그 환경일 경우(pm2) undefined
//     if (process.env.NODE_ENV === undefined) {
//         console.log(`${info.timestamp} - ${info.level}: ${info.message}`);
//     }
//     return `${info.timestamp} - ${info.level}: ${info.message}`;
// });
// export enum logLevel {
//     ERROR = 'error',
//     WARN = 'warn',
//     INFO = 'info',
//     DEBUG = 'dedug'
// }
// // svr_api
// export const LoggerApi = createLogger({
//     format: combine(
//         timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         logFormat,
//     ),
//     transports: [
//         new winstonDaily({
//             level: logLevel.INFO,
//             handleExceptions: true,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: apiServerLogDir + '/info',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//         new winstonDaily({
//             level: logLevel.ERROR,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: apiServerLogDir + '/error',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//     ],
// });
// export function readApiErrorLog(date: string) {
//     let path = apiServerLogDir + `/error/${date}.log`;
//     return loadLogFile(path);
// }
// export function readApiInfoLog(date: string) {
//     let path = apiServerLogDir + `/info/${date}.log`;
//     return loadLogFile(path);
// }
// export function readApiErrorDir() {
//     let path = apiServerLogDir + '/error';
//     return loadLogDir(path);
// }
// // svr_admin
// export const LoggerAdmin = createLogger({
//     format: combine(
//         timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         logFormat,
//     ),
//     transports: [
//         new winstonDaily({
//             level: logLevel.INFO,
//             handleExceptions: true,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: adminServerLogDir + '/info',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//         new winstonDaily({
//             level: logLevel.ERROR,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: adminServerLogDir + '/error',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//     ],
// });
// export function readAdminErrorLog(date: string) {
//     let path = adminServerLogDir + `/error/${date}.log`;
//     return loadLogFile(path);
// }
// export function readAdminInfoLog(date: string) {
//     let path = adminServerLogDir + `/info/${date}.log`;
//     return loadLogFile(path);
// }
// export function readAdminErrorDir() {
//     let path = adminServerLogDir + '/error';
//     return loadLogDir(path);
// }
// // chat_svr - ws server
// export const LoggerChat = createLogger({
//     format: combine(
//         timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         logFormat,
//     ),
//     transports: [
//         new winstonDaily({
//             level: logLevel.INFO,
//             handleExceptions: true,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: chatServerLogDir + '/info',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//         new winstonDaily({
//             level: logLevel.ERROR,
//             json: false,
//             datePattern: 'YYYY-MM-DD',
//             dirname: chatServerLogDir + '/error',
//             filename: `%DATE%.log`,
//             maxFiles: days,
//             zippedArchive: false,
//         }),
//     ],
// });
// export function readChatErrorLog(date: string) {
//     let path = chatServerLogDir + `/error/${date}.log`;
//     return loadLogFile(path);
// }
// export function readChatInfoLog(date: string) {
//     let path = chatServerLogDir + `/info/${date}.log`;
//     return loadLogFile(path);
// }
// export function readChatErrorDir() {
//     let path = chatServerLogDir + '/error';
//     return loadLogDir(path);
// }
//# sourceMappingURL=logger.js.map