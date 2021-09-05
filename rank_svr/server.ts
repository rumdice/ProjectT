import websocket from 'ws'
import http from 'http'
import express from 'express'

import database from '../common/database'
import { getControllerList } from '../common/util'
import { PING_TICK, PORT_SVR_RANK } from '../common/define'
import { ErrorCode } from '../packet/common'
import { LoggerRank } from '../common/logger'
import { Cron, cronResetRank } from '../common/cron'


const app = express()
const packetHandlerList = {} as any

export const rankServer = async () => {
    await Promise.all([database.init()])

    const rankReset =  new Cron() // TODO: 서버별로 다른 크론을 돌리게 세분화

    app.use(express.json())

    const controllerList = getControllerList('./rank_svr/controller') // TODO: 하드코딩 제거
    controllerList.forEach(e => {
        LoggerRank.info(`bind controller "${e}"`)
        bindController(require(`./controller/${e}`))
    })

    const port = process.env.PORT || PORT_SVR_RANK
    app.set('port', port)

    const server = http.createServer(app)
    const wss = new websocket.Server({ server })
    wss.on('connection', (ws: any) => {
        LoggerRank.info(`Client Connected`)

        // send ping to connected client
        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send("Ping...")
            }
        }, PING_TICK)

        // recv msg proc and resp
        ws.on('message', async (message: any) => {
            if (ws && ws.readyState === ws.OPEN) {
                // recv
                LoggerRank.info(`recv msg:${message}`)

                const packet = JSON.parse(message)
                let resp = ""
                try {
                    resp = await packetProcess(ws, packet.header, packet.body)
                }
                catch (e: any) {
                    const errName = e.name || "InternalError"
                    const errCode = e.result || ErrorCode.InternalError
                    const errMsg = e.message
                    const errStack = e.stack

                    const result = { result: errCode }
                    resp = JSON.stringify(result)

                    LoggerRank.error(`
                    ServerPID: ${process.pid},
                    Packet: ${packet.header},
                    RecvParam: ${JSON.stringify(packet.body)},
                    ErrorName: ${errName},
                    ResultCode: ${errCode},
                    CallStack: ${errStack},
                    Message: ${errMsg}\\end
                    `)
                }

                LoggerRank.info(`send resp msg:${resp}`)

                // resp
                ws.send(resp)
            }
        })

        ws.on('error', (error: any) => {
            LoggerRank.error(`WS ERROR!:${error}`)
        })

        ws.on('close', () => {
            LoggerRank.info(`Client DisConnect`)
            clearInterval(ws.interval) // clear
        })
    })

    // application server start
    server.listen(app.get('port'), () => {
        LoggerRank.info(`server start on port:${port}, process env:${process.env.NODE_ENV}`)
    })
}

function bindController(module: any) {
    type methodType = (client: any, param: any) => Promise<any>

    for (const entry of Object.entries(module)) {
        const methodName = `${entry[0]}`
        const binder = entry[1] as methodType
        packetHandlerList[methodName] = binder
        LoggerRank.info(`bind method: ${methodName}`)
    }
}

async function packetProcess(client: any, name: string, param: any) {
    const result = await packetHandlerList[name].call(packetHandlerList, client, param)
    return JSON.stringify(result)
}

// 랭킹 서버에서는 그룹 센딩이 필요없다. (컨텐츠에 따라 나올 수도 있음)
// export async function sendGroup(sessionList: any[], respPacket: string) {
//     sessionList.forEach(e => {
//         e.client.send(respPacket)
//     })

//     LoggerRank.info(`group send resp msg:${respPacket}`) // 그룹별로 출력하면 너무 많으니 편의상 한번만
// }