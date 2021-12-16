import { request as httprequest } from 'http'
import { request as httpsrequest } from 'https'
import { response } from 'express'
import { dev, local, ServerInfo } from '../../common/define'

export function doCheat(url: string, userUuid: string) {
    // pm2 env
    const serverInfo: ServerInfo = (process.env.NODE_ENV === "local") ? local : dev

    const packetInfo = {
        header: url,                                        // protocol
        body: JSON.stringify({ user_uuid: userUuid }),      // packet body - only cheat json
    }

    const options = {
        host: serverInfo.address,
        port: serverInfo.port,
        path: packetInfo.header,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let req: any
    req = (process.env.NODE_ENV === "local") ? httprequest(options, resp => { printf(resp) }) : httpsrequest(options, resp => { printf(resp) })  // local or dev,live
    req.write(packetInfo.body)
    req.end()

    return (response.statusCode === 200) ? true : false
}

function printf(e: any) {
    // tslint:disable-next-line: no-console
    console.log(e.statusCode)
    // tslint:disable-next-line: no-console
    console.log(e.statusMessage)
}