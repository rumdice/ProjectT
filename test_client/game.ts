import { request as httprequest } from 'http'
import { request as httpsrequest } from 'https'
import { ClientRequest } from 'http'
import { COOKIE_HEADER, dev, local, ServerInfo } from '../common/define'
import { Platform } from '../packet/errorCode'


let server = "local"
// server = "dev"
const serverInfo: ServerInfo = (server === "local") ? local : dev

let req: any
let param: any
let url = ""

url = "/Login"
param = {
    userUid: "aabbccdd12343",
    userName: "username1",
    platform: Platform.Android
}

let options = {
    host: serverInfo.address,
    port: serverInfo.port,
    path: url,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

req = (server === "local") ? httprequest(options, response => {
    printf(response)
    nextCall(response.headers[COOKIE_HEADER])
}) : httpsrequest(options, response => {
    printf(response)
    nextCall(response.headers["x-rumdice"])
})
req.write(JSON.stringify(param))
req.end()


function nextCall(cookie: any) {
    url = "/ItemInfo"
    param = {
        userUid: "aabbccdd12343",
    }

    // url = "/Test"
    // param = {
    //     userUid: "aabbccdd12343",
    // }


    let headerParam: any
    headerParam = {
        "x-rumdice": cookie
    }

    options = {
        host: serverInfo.address,
        port: serverInfo.port,
        path: url,
        method: 'POST',
        headers:
            { 'Content-Type': 'application/json' }
    }

    let reqs: ClientRequest
    reqs = (server === "local") ? httprequest(options, response => { handleResponse(response) }) : httpsrequest(options, response => { handleResponse(response) })
    reqs.setHeader("x-rumdice", cookie)
    reqs.write(JSON.stringify(param))
    reqs.end()
}


function handleResponse(resp: any) {
    let serverData = ''
    resp.on('data', (chunk: string) => {
        serverData += chunk
    })
    resp.on('end', () => {
        console.log("Response Status:", resp.statusCode)
        console.log("Response Headers:", resp.headers)
        console.log(serverData)
    })
}


function printf(e: any) {
    console.log(server)
    console.log(url)
    console.log(JSON.stringify(param))
    console.log(e.statusCode)
    console.log(e.statusMessage)
}