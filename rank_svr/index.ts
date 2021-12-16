import cluster from 'cluster'
import os from 'os'
import { CLUSTER_MAX_COUNT } from '../common/define'
import { LoggerRank } from '../common/logger'
import { rankServer } from './server'

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
            LoggerRank.info(`worker was killed by signal: ${signal}`)
        }
        else if (code !== 0) {
            LoggerRank.info(`worker exited with error code: ${code}`)

            if (code === 200) {
                LoggerRank.info(`worker restart`)
                cluster.fork()
            }
        }
        else {
            LoggerRank.info(`worker success!`)
        }
    })

    cluster.on('online', (worker: any) => {
        LoggerRank.info(`worker pid:${worker.process.pid} is online`)
    })

    cluster.on('message', (worker: any, msg: string) => {
        LoggerRank.info(`worker pid:${worker.process.pid}: msg:${msg}`)
    })

    cluster.on('listening', (worker: any, addr: string) => {
        LoggerRank.info(`worker pid:${worker.process.pid}: addr:${addr}`)
    })
}
else {
    // Server set, create, run
    rankServer()
}