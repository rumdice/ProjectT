import fs from "fs";
//import { Result } from "../packet/jsonStructs";

export function loadConfig(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

export function loadLogFile(path: string) {
    return fs.readFileSync(path, 'utf8');
}

export function loadLogDir(path: string) {
    return fs.readdirSync(path);
}

export function getControllerList(path: string) {
    let conList = fs.readdirSync(path);
    let conNames: string[] = [];

    conList.forEach(e => {
        let filetype = e.split(".");
        if (filetype[1] === 'ts') {
            conNames.push(filetype[0]);
        }
    });

    return conNames;
}

export function generateStringTag(length: number) {
    const source = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';
    return [...Array(length)].map(() => source[Math.floor(Math.random() * source.length)]).join('');
}

export function panic(result: string, message?: string, packet?: string, param?: any) {
    const error: any = new Error();
    error.name = "PanicError";
    error.result = result;
    error.message = message;

    return error;
}

export function dbError(sqlMsg: string) {
    const error: any = new Error();
    error.name = "DBError";
    error.result = "DBError";
    error.message = sqlMsg;

    return error;
}


export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
}

export function getDateDiff(datetime1: Date, datetime2: Date): number {
    const date1 = Date.UTC(datetime1.getUTCFullYear(), datetime1.getUTCMonth(), datetime1.getUTCDate());
    const date2 = Date.UTC(datetime2.getUTCFullYear(), datetime2.getUTCMonth(), datetime2.getUTCDate());
    return Math.floor((date1 - date2) / 86400000);
}