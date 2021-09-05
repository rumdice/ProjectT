import { CronJob } from 'cron'
import { LoggerGame } from './logger'

import * as csv from "./csv"
import * as xlsx from "./xlsx"
import * as shell from "./shell"
import * as git from "./git"
import { resetRank } from '../rank_svr/query/rank'

// second(0-59), min(0-59), hour(0-23), Day of Month(1-31), Month(0-11, Jan-Dec), Day of Week(0-6, Sun-Sat)
const every1Sec = '* * * * * *'
const every5Sec = '*/5 * * * * *'
const every10sec = '*/10 * * * * *'

const every1Min = '0 * * * * *'
const every2Min = '0 */2 * * * *'
const every5Min = '0 */5 * * * *'
const every10Min = '0 */10 * * * *'

const everyThursDay = '0 0 0 * * 4' // 매월 매일 목요일 00시 00분 00초


export class Cron {
    resetRank: CronJob
    checkTableUpdate: CronJob

    constructor() {
        // 매주 목요일 0시 랭크 리셋
        this.resetRank = new CronJob(everyThursDay, async () => {
            try {
                await cronResetRank()
            }
            catch (e) {
                LoggerGame.error(e)
                this.resetRank.stop()
            }
        })
        if (!this.resetRank.running) {
            this.resetRank.start()
            LoggerGame.info(`cronjob cronResetRank is started.`)
        }

        // 매 1분마다 테이블 패치 git check
        this.checkTableUpdate = new CronJob(every1Min, async () => {
            try {
                await cronCheckTableUpdate()
            }
            catch (e) {
                LoggerGame.error(e)
                this.checkTableUpdate.stop()
            }
        })
        if (!this.checkTableUpdate.running) {
            this.checkTableUpdate.start()
            LoggerGame.info(`cronjob checkTableUpdate is started.`)
        }
    }
}

export async function test() {
    LoggerGame.info("Cron Test!")
}


export async function cronResetRank() {
    await resetRank()
    LoggerGame.info("Reset TeamHelp Done!")
}

const taskDone = (jobName: unknown) => LoggerGame.info(`Completed async ${jobName}`)

const cronCheckTableUpdate = async () => {
    const checkRes = await git.gitcheckStart()
    taskDone(checkRes)

    if (checkRes === true) {
        const shellStartRes = await shell.shellStart()
        taskDone(shellStartRes)

        const csvRes = await csv.csvStart()
        taskDone(csvRes)
    }
}

export const initTable = async () => {
    const csvRes = await csv.csvStart()
    taskDone(csvRes)
}