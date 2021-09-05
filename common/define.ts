export const CLUSTER_MAX_COUNT = 2

export const MAX_USER_NICK_NAME = 12

export const PORT_SVR_GAME = 10010
export const PORT_SVR_ADMIN = 5000
export const PORT_SVR_CHAT = 8080
export const PORT_SVR_RANK = 9090

export const CONFIG_PATH_DB_LOCAL = "./config/dbconfig_local.json"      // local은 바로 디버그로 실행 하므로 경로가 다름 (pm2 x)
export const CONFIG_PATH_DB_DEV = "../config/dbconfig_dev.json"
export const CONFIG_PATH_DB_LIVE = "../config/dbconfig_real.json"
export const CONFIG_PATH_GIT = "./config/gitConfig.json"                // 모니터링 할 git 정보 설정파일

export const BASH_PATH_TABLE = `./script/pull_table_csv.sh`

export const PING_TICK = 5000

export const SESSION_TTL = 2 * 3600
export const USER_TTL = 4 * 3600
export const COOKIE_HEADER = 'x-rumdice'
export const MAX_CNT_GENERATE_TOKEN = 32


export const tablePathBaseCsv = `./table/csv`                     // git pull 받은 csv 테이블 파일 기본 경로
export const csvFiles = [
    `LevelTable.csv`,
    `SeasonTable.csv`,
    `ForbiddenWordTable.csv`
]

export const tablePathBaseXlsx = `./table/csv`                     // git pull 받은 csv 테이블 파일 기본 경로
export const xlsxFiles = [
    `LevelTable.xlsx`,
    `SeasonTable.xlsx`,
    `ForbiddenWordTable.xlsx`
]


export enum platform {
    android = "android",
    ios = "ios",
    editor = "editor"
}

export const dbErrorMsg = {
    undefined: "select result is undefined.",
    affect0: "affected row is 0.",
    length0: "select result length is 0.",
    tableErr: "table data is abnormal.",
    csvFileErr: "csv file table data is null"
}

// server info
export interface ServerInfo {
    address: string
    port: number
}

export let local: ServerInfo = {
    address: "127.0.0.1",
    port: PORT_SVR_GAME,
}

export let dev: ServerInfo = {
    address: "dev.rumdice.net",
    port: 443,
}

export let live: ServerInfo = {
    address: "live.rumdice.net",
    port: 443,
}