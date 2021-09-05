import * as child from "child_process"
import { BASH_PATH_TABLE } from "./define"
import { LoggerGame } from "./logger"

export const shellStart = () => {
    console.log(`Started async shellStart()..`)

    const promise = new Promise((resolve, reject) => {
        doBashSrc((err: any, reply: any) => {
            if (err) reject(err)
            resolve(reply)
        })
    })

    console.log(`Returning from async shellStart()`)

    return promise
}


function doBashSrc(callback: any) {
    child.exec(`sh ${BASH_PATH_TABLE}`, (error, stdout, stderr) => {
        if (error) {
            LoggerGame.error(`error: ${error.message}`)
            return callback(null, "sh error")
        }
        if (stderr) {
            LoggerGame.error(`stderr: ${stderr}`)
            return callback(null, "sh stderr")
        }
        if (stdout) {
            LoggerGame.info(`stdout: ${stdout}`)
            return callback(null, "sh stdout")
        }
        return callback(null, "sh done")
    })
}