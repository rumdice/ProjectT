export const CLUSTER_MAX_COUNT = 2

export const MAX_USER_NICK_NAME = 12

export const PORT_SVR_GAME = 10010
export const PORT_SVR_ADMIN = 5000
export const PORT_SVR_CHAT = 8080
export const PORT_SVR_RANK = 9090

export const CONFIG_PATH_GIT = "./config/gitConfig.json"                // 모니터링 할 git 정보 설정파일

export const CONFIG_MYSQL_LOCAL = "./config/mysql_local.json"           // local docker mysql
export const CONFIG_REDIS_LOCAL = "./config/redis_local.json"           // local docker redis

// local에서 디버그로 실행하는지 실제 환경에서 pm2 기반으로 실행하는지에 따라 상대 경로가 다름
export const CONFIG_MYSQL_DEV = "../config/mysql_aws.json"
export const CONFIG_REDIS_DEV = "../config/redis_aws.json"

// 머신에 따른 상대경로 이슈
export const CONTROL_PATH_LOCAL = "./game_svr/controller"
export const CONTROL_PATH_DEV = "../game_svr/controller"


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