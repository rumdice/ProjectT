
import cluster from 'cluster';
import os from 'os';
import { CLUSTER_MAX_COUNT } from '../common/define';
import { gameServer } from "./server";

if (cluster.isPrimary) {
    // os.cpus().forEach(function () {
    //     cluster.fork();
    // });

    for (let i = 0; i < CLUSTER_MAX_COUNT; i++) {
        cluster.fork();
    }

    // worker dead
    cluster.on('exit', function (code: number, signal: any) {
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        }
        else if (code !== 0) {
            console.log(`worker exited with error code: ${code}`);

            if (code === 200) {
                console.log(`worker restart`);
                cluster.fork();
            }
        }
        else {
            console.log(`worker success!`);
        }
    });

    cluster.on('online', function (worker: any) {
        console.log(`worker pid:${worker.process.pid} is online`);
    });

    cluster.on('message', function (worker: any, msg: string) {
    });

    cluster.on('listening', function (worker: any, addr: string) {
        console.log(`worker Id:${worker.id} cluster listen addr:${addr}`);
    });
}
else {
    // Server set, create, run
    gameServer();
}