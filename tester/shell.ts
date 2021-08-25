import * as sh from "child_process"
import * as csv from "./csv"

export const start = async () => {
    console.log(`start shell`)
    await shCmdSpawn()
}


async function shCmd() {
    sh.exec("cd ..", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}


async function shCmd1() {
    sh.exec("ls", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}

async function shBash() {
    sh.exec("sh start.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}

async function shCmdSysn() {
    return sh.execSync('cd .. ls pwd').toString() // Command failed
}

// async function spawn() {
//     sh.spawnSync('cd ..')
//     sh.spawnSync('cd ..')
//     sh.spawnSync('pwd')
//     console.log(sh.execSync('ls').toString())
// }

async function shCmdSpawn() {
    sh.spawn('cd .. && cd .. && pwd', { shell: true })
        .stdout.on('data', data => outputData(data.toString()))
        //.stdout.on('data', data => console.log(data.toString()))
        //.on('close', (code: any) => console.log(`child process exited with code ${code} end shell`))
        .on('close', (code: any) => endShell(code))
}

const outputData = (data: string) => {
    console.log(data)
}

const endShell = async (code:any) => {
    console.log(`child process exited with code ${code} end shell`)
    await csv.start()
}
