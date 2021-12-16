import { request as httprequest } from 'http'
import { request as httpsrequest } from 'https'
import { dev, local, ServerInfo } from '../common/define'

let server = ""
server = "local"

const serverInfo: ServerInfo = (server === "local") ? local : dev
let req: any

let url = ""
let param: any

// // 테스트 패킷 내용
url = "/login"
param = {
    userUid: "aabbccdd12343",
    userName: "username1"
}

// url = "/Test"
// param = {
//
// }

// request and response
const options = {
    host: serverInfo.address,
    port: serverInfo.port,
    path: url,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

// local/dev : http/https
req = (server === "local") ? httprequest(options, response => { printf(response) }) : httpsrequest(options, response => { printf(response) })
req.write(JSON.stringify(param))
req.end()

function printf(e: any) {
    console.log(server)
    console.log(url)
    console.log(JSON.stringify(param))
    console.log(e.statusCode)
    console.log(e.statusMessage)
}