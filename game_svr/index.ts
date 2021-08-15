
import cluster from 'cluster'
import os from 'os'
import { CLUSTER_MAX_COUNT } from '../common/define'
import { LoggerGame } from '../common/logger'
import { gameServer } from "./server"

if (cluster.isPrimary) {
    // os.cpus().forEach(function () {
    //     cluster.fork();
    // });

    for (let i = 0; i < CLUSTER_MAX_COUNT; i++) {
        cluster.fork()
    }

    // worker dead
    cluster.on('exit', (code: number, signal: any) => {
            if (signal) {
                LoggerGame.info(`worker was killed by signal: ${signal}`)
            }
            else if (code !== 0) {
                LoggerGame.info(`worker exited with error code: ${code}`)

                if (code === 200) {
                    LoggerGame.info(`worker restart`)
                    cluster.fork()
                }
            }
            else {
                LoggerGame.info(`worker success!`)
            }
        })

    cluster.on('online', (worker: any) => {
        LoggerGame.info(`worker pid:${worker.process.pid} is online`)
    })

    cluster.on('message', (worker: any, msg: string) => {
        LoggerGame.info(`worker pid:${worker.process.pid}: msg:${msg}`)
    })

    cluster.on('listening', (worker: any, addr: string) => {
        LoggerGame.info(`worker pid:${worker.process.pid}: addr:${addr}`)
    })
}
else {
    // Server set, create, run
    gameServer()
}