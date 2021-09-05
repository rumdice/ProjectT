import * as child from "child_process"
import { loadConfig, writeConfig } from "./util"
import { CONFIG_PATH_GIT } from "./define"

const config = loadConfig(CONFIG_PATH_GIT)
const cmd = "git ls-remote --heads"

export const gitcheckStart = () => {
    const promise = new Promise((resolve, reject) => {
        checkHashChangedCallback((err: any, reply: any) => {
            if (err) reject(err)
            resolve(reply)
        })
    })

    return promise
}


function executeScript() {
    console.log(`[${new Date()}], distribute HEAD:${config.git.HEAD}`)
    const sh = config.dist

    writeConfig(CONFIG_PATH_GIT, config)

    child.exec(sh.command, (error, stdout, stderr) => {
        console.log(stdout)
    })
}

export function checkHashChangedCallback(callback: any) {
    const git = config.git

    child.exec([cmd, git.repository].join(" "), (error, stdout, stderr) => {
        const data = stdout.split("\n")
        let head

        for (let i = 0, len = data.length; i < len; i++) {
            const heads = data[i].split("\t")
            const regx = new RegExp(git.branch)

            if (regx.test(heads[1])) {
                head = heads[0]
                break
            }
        }

        if (!head) {
            console.log(`[${new Date()}], There is no ${git.branch} branch`)
        } else {
            if (git.HEAD !== head) {
                git.HEAD = head
                executeScript()
                return callback(null, true)
            }
        }
        return callback(null, false)
    })
}