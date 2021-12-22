import express, { Router } from "express"
import database from "../common/database"
import { getControllerList } from "../common/util"
import { COOKIE_HEADER } from "../common/define"
import session, { getCookie, updateSession } from "../common/session"
import { LoggerGame } from "../common/logger"
import { Cron, initTable } from "../common/cron"
import { ErrorCode } from "../packet/errorCode"
import path from 'path'

const app = express()

export const gameServer = async () => {
    await Promise.all([database.init(), session.init()])
    // const cronJob =  new Cron() // TODO: 서버별 세분화 작업

    app.use(express.json())

    const controllerPath = path.join(__dirname, 'controller')
    const controllerList = getControllerList(controllerPath)
    const router = express.Router()
    for (const controller of controllerList) {
        LoggerGame.info(`bind controller "${controller}"`)
        bindController(router, require(`./controller/${controller}`))
    }

    app.use(process.env.ROUTE || '/', router)

    const port = process.env.PORT
    if (port === undefined) {
        LoggerGame.error("pm2 or server setting error")
        process.exit()
    }

    app.set('port', port)
    app.listen(app.get('port'), () => {
        if (process.send) {
            process.send('ready')
        }
    })
}



function bindController(router: Router, module: any) {
    type ControllerBinder = (cookie: any, param: any) => Promise<any>

    function process(cookie: any, param: any, callback: ControllerBinder, res: any) {
        callback(cookie, param)
            .then(async result => {

                // 성공,

                // cookie 정보로 session 셋팅
                const newCookie = await updateSession(cookie)
                if (newCookie !== undefined) {
                    res.set(COOKIE_HEADER, newCookie)
                }

                let ret = result
                if (result === undefined) {
                    ret = { error: ErrorCode.Success }
                }

                if (typeof result === 'number') {
                    ret = { error: result }
                }

                // res.json({
                //     error: ErrorCode.Success,
                //     message: result.message,
                // })

                res.json(ret)
            })
            .catch(reason => {
                // 시스템 에러
                // 컨텐츠 에러
                const resp = {
                    ReceivePacket: callback.name,
                    ReceiveParam: JSON.stringify(param),
                    Comment: reason.message,
                    CallStack: reason.stack
                }

                LoggerGame.error(resp) // TODO: 이 정보를 클라로 보내는 패킷에 노출. product레벨에서는 조절.

                res.json({
                    error: (typeof reason.code !== 'number') ? ErrorCode.InternalError : reason.code,
                    message: resp
                })
            })
    }

    for (const entry of Object.entries(module)) {
        const modulePath = `/${entry[0]}`
        const binder = entry[1] as ControllerBinder
        router.post(modulePath, (req, res) => process(getCookie(req.header(COOKIE_HEADER)), req.body, binder, res))
    }

    if (typeof module === 'function') {
        module()
    }
}