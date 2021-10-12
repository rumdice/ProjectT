import express, { Router } from "express"
import database from "../common/database"
import { getControllerList } from "../common/util"
import { COOKIE_HEADER, PORT_SVR_GAME } from "../common/define"
import { ErrorCode } from "../packet/common"
import session, { getCookie, updateSession } from "../common/session"
import { LoggerGame } from "../common/logger"
import { Cron, initTable } from "../common/cron"

const app = express()

export const gameServer = async () => {
    await Promise.all([database.init(), session.init()])

    // const cronJob =  new Cron() // TODO: 서버별 세분화 작업

    app.use(express.json())

    const router = express.Router()
    const controllerList = getControllerList('./game_svr/controller')
    for (const controller of controllerList) {
        LoggerGame.info(`bind controller "${controller}"`)
        bindController(router, require(`./controller/${controller}`))
    }

    app.use(process.env.ROUTE || '/', router)

    const port = process.env.PORT || PORT_SVR_GAME
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

                res.json(ret)
            })
            .catch(reason => {
                const errName = reason.name || "InternalError"
                const errCode = reason.result || ErrorCode.InternalError
                const errMsg = reason.message
                const errStack = reason.stack

                // let totalErrorMsg = `
                // Packet: /${cb.name},
                // RecvParam: ${JSON.stringify(param)},
                // ErrorName: ${errName},
                // ResultCode: ${errCode},
                // CallStack: ${errStack},
                // Message: ${errMsg}\\end`;
                // LoggerGame.error(totalErrorMsg);

                const totalErrorMsgToClient = `Packet:/${callback.name}, RecvParam:${JSON.stringify(param)}, ErrorName:${errName}, ResultCode:${errCode}, Message:${errMsg} \\end`
                res.json({
                    error: errCode,
                    message: totalErrorMsgToClient
                })
            })
    }

    for (const entry of Object.entries(module)) {
        const path = `/${entry[0]}`
        const binder = entry[1] as ControllerBinder
        router.post(path, (req, res) => process(getCookie(req.header(COOKIE_HEADER)), req.body, binder, res))
    }

    if (typeof module === 'function') {
        module()
    }
}