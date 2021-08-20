import * as sh from "child_process"

// TODO: 커맨드의 연속 실행을 의도했으나 실패 (작업은 비동기지만 커맨드 적용 후 상태가 저장이 안되는 것인가?)
export const start = async () => {
    await shCmd()
    await shCmd1()
}


// cmd, powershell에서는 linux 커맨드 안먹힘
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