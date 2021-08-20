import * as sh from "child_process"

// TODO: 커맨드의 연속 실행을 의도했으나 실패 (작업은 비동기지만 커맨드 적용 후 상태가 저장이 안되는 것인가?)
export const start = async () => {
    // await shCmd()
    // await shCmd1()

    // await shBash() // 방법1. 성공. 순차적으로 작성된 bash 파일 자체를 실행 (의도 대로 동작. 단점. 관리해야 하는 파일이 생김)

    // await shCmdSysn() // 방법2. 실패. 연속 커맨드 실행이 아니였음. (커맨드 하나의 작업이 완료된다는 의미. 결국 exec의 비동기 함수 레핑과 같은 효과?)

    // await spawn() // 방법3. 실패.

    await spawn1() // 방법4. 성공
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
    //console.log(sh.execSync((`cd .. ls pwd`).toString())
    return sh.execSync('cd .. ls pwd').toString() // Command failed
}

async function spawn() {
    sh.spawnSync('cd ..')
    sh.spawnSync('cd ..')
    sh.spawnSync('pwd')
    console.log(sh.execSync('ls').toString())
}

async function spawn1() {
    sh.spawn('cd .. && cd .. && pwd', { shell: true })
        .stdout.on('data', (data) => {
            console.log(data.toString())
        })
}