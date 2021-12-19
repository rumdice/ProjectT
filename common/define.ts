export const CLUSTER_MAX_COUNT = 2

export const CONFIG_PATH_GIT = "./config/gitConfig.json"                // 모니터링 할 git 정보 설정파일
export const BASH_PATH_TABLE = `./script/pull_table_csv.sh`

export const PING_TICK = 5000

export const SESSION_TTL = 2 * 3600
export const USER_TTL = 4 * 3600
export const COOKIE_HEADER = 'x-rumdice'
export const MAX_CNT_GENERATE_TOKEN = 32


export const tablePathBaseCsv = `./table/csv`                     // git pull 받은 csv 테이블 파일 기본 경로
export const csvFiles = [
    `level.csv`,
    `season.csv`,
    `word.csv`
]

export const tablePathBaseXlsx = `./table/csv`                     // git pull 받은 csv 테이블 파일 기본 경로
export const xlsxFiles = [
    `level.xlsx`,
    `season.xlsx`,
    `word.xlsx`
]

export const dbErrorMsg = {
    undefined: "select result is undefined.",
    affect0: "affected row is 0.",
    length0: "select result length is 0.",
    tableErr: "table data is abnormal.",
    csvFileErr: "csv file table data is null"
}


export interface ServerInfo {
    address: string
    port: number
}

export const local: ServerInfo = {
    address: "127.0.0.1",
    port: 10010,
}

export const dev: ServerInfo = {
    address: "game.rumdice.net",
    port: 443,
}

export const live: ServerInfo = {
    address: "live.rumdice.net",
    port: 443,
}