import express = require('express')
import { errorPage } from './error'
import _fetch from "node-fetch"
import { checkLogin } from '../controller/login'
import { Platform } from '../../packet/errorCode'

const viewPacket = 'packet' // .pug
const bodyPacket = {
    title: 'packet',
    url: "",
    request: "{}",
    response: "{}",
}

const router = express.Router()
router.get('/', async (req, res) => {
    if (!checkLogin()) {
        errorPage("Login Fail", res)
    }

    res.render(viewPacket, bodyPacket)
})

router.post('/send', async (req, res) => {
    const url = req.body.url
    const packetBody = req.body.packet_body

    const loginBody = {
        userUid: "",
        userName: "",
        platform: Platform.Android,
    }

    // 패킷 보내기 전 로그인 진행
    const packetLogin = {
        _url: "Login",
        _body: JSON.stringify(loginBody),
    }
    let responseLogin = ""
    let cookie
    await fetchLoginJson(packetLogin)
        .then(async response => {
            responseLogin = JSON.stringify(response.json())
            cookie = response.headers.get("x-rumdice")
        })
        .catch(error => {
            responseLogin = JSON.stringify(error)
        })


    // send packet
    const packetContent = {
        _url: url,
        _body: packetBody,
    }
    let responsePacket = ""
    await fetchJson(packetContent, cookie)
        .then(response => {
            responsePacket = JSON.stringify(response)
        })
        .catch(error => {
            responsePacket = JSON.stringify(error)
        })

    bodyPacket.url = url
    bodyPacket.request = packetBody
    bodyPacket.response = responsePacket
    res.render(viewPacket, bodyPacket)
})

async function fetchJson(sendParam: any, cookie: any) {
    const packetInfo = {
        url: sendParam._url,
        body: sendParam._body,
    }

    let headerParam: any
    headerParam = {
        "x-rumdice": cookie
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rumdice': cookie,
        },
        body: packetInfo.body
    }

    // send and resp
    const host = selectGameServer()
    const resp = await _fetch((host + packetInfo.url), options)
    return resp.json()
}

async function fetchLoginJson(sendParam: any) {
    const packetInfo = {
        url: sendParam._url,
        body: sendParam._body,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: packetInfo.body
    }

    // send and resp
    const host = selectGameServer()
    return await _fetch((host + packetInfo.url), options)
}

function selectGameServer() {
    let host = ""
    switch (process.env.NODE_ENV) {
        case "dev":
            host = "https://game.rumdice.net/"
            break

        case "local":
            host = "http://localhost:10010/"
            break

        default:
            host = "http://localhost:10010/"
            break
    }

    return host
}

export default router