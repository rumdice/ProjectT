import fs from "fs"
import { ErrorCode } from "../packet/errorCode"

export function loadConfig(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export function writeConfig(path: string, config: any) {
    const newData = JSON.stringify(config, null, 2)
    return fs.writeFileSync(path, newData)
}

export function loadLogFile(path: string) {
    return fs.readFileSync(path, 'utf8')
}

export function loadLogDir(path: string) {
    return fs.readdirSync(path)
}

export function getControllerList(path: string) {
    const conList = fs.readdirSync(path)
    const conNames: string[] = []

    conList.forEach(e => {
        const filetype = e.split(".")
        if (filetype[1] === 'js' && filetype[2] !== 'map') {
            conNames.push(filetype[0])
        }
    })

    return conNames
}

export function randomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


// TODO: panic 과 success를 하나로 통합 및, 최상단 (server.ts에서 처리)
export function panic(errorCode: ErrorCode, message?: string) {
    const error: any = new Error()
    error.code = errorCode
    error.message = message

    return error
}

export function success<T>(extra?: T): { error: ErrorCode } & T {
    const result = { error: ErrorCode.Success }
    if (extra != null) {
        Object.assign(result, extra)
    }
    return result as { error: ErrorCode } & T
}




// TODO: 같은 코드의 반복. 분류
export function successChat<T>(extra?: T): { error: ErrorCode } & T {
    const result = {}
    if (extra != null) {
        Object.assign(result, extra)
    }
    return result as { error: ErrorCode } & T
}

export function successRank<T>(extra?: T): { error: ErrorCode } & T {
    const result = {}
    if (extra != null) {
        Object.assign(result, extra)
    }
    return result as { error: ErrorCode } & T
}