
import { CronJob } from 'cron'

import { LoggerRank } from './logger'
import * as queryRank from '../rank_svr/query/rank'


// TODO: 공용 폴더에 넣었는데 귀찮으니까 일단 쓰기

// second(0-59), min(0-59), hour(0-23), Day of Month(1-31), Month(0-11, Jan-Dec), Day of Week(0-6, Sun-Sat)
const every1Sec = '* * * * * *'
const every5Sec = '*/5 * * * * *'

const every2Min = '0 */2 * * * *'
const every5Min = '0 */5 * * * *'
const every10Min = '0 */10 * * * *'

const everySatDay = '0 0 12 * * 6' // 매월 매일 토요일 12시 00분 00초
const everySunDay = '0 0 0 * * 0'  // 매월 매일 일요일 00시 00분 00초


// 랭킹
// 랭킹 리셋
export class CronResetRank {
    cronJob: CronJob

    constructor() {
        this.cronJob = new CronJob(everySunDay, async () => {
            try {
                // await test(); // 같은날 같은 시간에 동작하는 여러 cron을 등록 가능
                await cronResetSeasonRank()
            }
            catch (e) {
                LoggerRank.error(e)
                this.cronJob.stop()
            }
        })

        if (!this.cronJob.running) {
            this.cronJob.start()
            LoggerRank.info(`CronJob ${CronResetRank.name} Start!`)
        }
    }
}

// 랭킹 정산
// TODO: tslint 규칙 1개의 파일에 사용 클래스의 최대 갯수 정의. 일단 주석처리로 경고 넘어감. (보통 1파일 1클래스가 보기 깔끔함)
// tslint:disable-next-line: max-classes-per-file
export class CronCalcRank {
    cronJob: CronJob

    constructor() {
        this.cronJob = new CronJob(everySunDay, async () => {
            try {
                await cronCalcSeasonRank()
            }
            catch (e) {
                LoggerRank.error(e)
                this.cronJob.stop()
            }
        })

        if (!this.cronJob.running) {
            this.cronJob.start()
            LoggerRank.info(`CronJob ${CronCalcRank.name} Start!`)
        }
    }
}


export async function cronResetSeasonRank() {
    await queryRank.resetSeasonRank()
    LoggerRank.info(`CronJob ${cronResetSeasonRank.name}() Done!`)
}

export async function cronCalcSeasonRank() {
    await queryRank.calcSeasonRank()
    LoggerRank.info(`CronJob ${cronCalcSeasonRank.name}() Done!`)
}

export async function test() {
    LoggerRank.info("Cron Test!")
}


// 테이블 파싱