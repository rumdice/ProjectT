import express from 'express'
import { readGameErrorDir, readGameErrorLog, readGameInfoDir, readGameInfoLog } from '../../common/logger'

const viewLog = 'log'
const viewLogRes = 'logRes' // TODO: post 결과를 해당 페이지의 modal로 표현, 일단 별도 페이지에 표기.
const bodyLog = {
    title: 'log',
    logNameList: [""],
    logDataList: [""],
    idx: 0
}

const router = express.Router()
router.get('/', (req, res) => {
    const logDir = readGameInfoDir()
    const logNames: string[] = []

    logDir.forEach(e => {
        const fileType = e.split(".")
        if (fileType[1] === 'log') {
            logNames.push(fileType[0])
        }
    })

    bodyLog.logNameList = logNames
    res.render(viewLog, bodyLog)
})

router.post('/detail', (req, res) => {
    const logDir = readGameInfoDir()
    const logNames: string[] = []
    const logDatas: string[] = []

    logDir.forEach(e => {
        const fileType = e.split(".")
        if (fileType[1] === 'log') {
            logNames.push(fileType[0])
        }
    })

    logNames.forEach(e => {
        let logData = readGameInfoLog(e).toString()
        logData = logData.replace(/\r/g, "")

        logDatas.push(logData)
    })

    bodyLog.idx = req.body.bidx
    bodyLog.logNameList = logNames
    bodyLog.logDataList = logDatas
    res.render(viewLogRes, bodyLog)
})

export default router