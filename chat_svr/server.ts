import websocket from 'ws';
import http from 'http';
import express from 'express';

import database from '../common/database';
import { getControllerList } from '../common/util';
import { LoggerChat } from '../common/logger';
import { PING_TICK, PORT_SVR_CHAT } from '../common/define';
import { ErrorCode } from '../packet/commonpacket';

const app = express();
const packetHandlerList = {} as any;

export const chatServer = async () => {
    await Promise.all([database.init()]);

    app.use(express.json());

    let controllerList = getControllerList('./chat_svr/controller');
    controllerList.forEach(e => {
        console.log(`bind controller "${e}"`);
        bindController(require(`./controller/${e}`));
    });

    let port = process.env.PORT || PORT_SVR_CHAT;
    app.set('port', port);

    const server = http.createServer(app);
    const wss = new websocket.Server({ server });
    wss.on('connection', (ws: any) => {
        console.log(`Client Connected`);

        // send ping to connected client
        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send("Ping...");
            }
        }, PING_TICK);

        // recv msg proc and resp
        ws.on('message', async (message: any) => {
            if (ws && ws.readyState === ws.OPEN) { 
                // recv
                console.log(`recv msg:${message}`);
                // LoggerChat.info(`recv msg:${message}`);

                var packet = JSON.parse(message);
                let resp = "";
                try {
                    resp = await packetProcess(ws, packet.header, packet.body);
                }
                catch (e: any) {
                    let errName = e.name || "InternalError";
                    let errCode = e.result || ErrorCode.InternalError;
                    let errMsg = e.message;
                    let errStack = e.stack;

                    const result = { result: errCode };
                    resp = JSON.stringify(result);

                    // LoggerChat.error(`
                    // ServerPID: ${process.pid},
                    // Packet: ${packet.header},
                    // RecvParam: ${JSON.stringify(packet.body)},
                    // ErrorName: ${errName}, 
                    // ResultCode: ${errCode}, 
                    // CallStack: ${errStack},
                    // Message: ${errMsg}\\end
                    // `);
                }

                console.log(`send resp msg:${resp}`);
                //LoggerChat.info(`send resp msg:${resp}`);
                
                // resp
                ws.send(resp);
            }

        });

        ws.on('error', (error: any) => {
            LoggerChat.error(`WS ERROR!:${error}`);
        });

        ws.on('close', () => {
            console.log('Client DisConnect');
            clearInterval(ws.interval); // clear
        });
    });

    // application server start
    server.listen(app.get('port'), () => {
        console.log(`chat server start on port:${port}, process env:${process.env.NODE_ENV}`);
        //LoggerChat.info(`chat server start on port:${port}, process env:${process.env.NODE_ENV}`);
    });
};

function bindController(module: any) {
    type methodType = (client: any, param: any) => Promise<any>;

    for (let entry of Object.entries(module)) {
        let methodName = `${entry[0]}`;
        const binder = <methodType>entry[1];
        packetHandlerList[methodName] = binder;
        console.log(`bind method: ${methodName}`);
    }
}

async function packetProcess(client: any, name: string, param: any) {
    let result = await packetHandlerList[name].call(packetHandlerList, client, param);
    return JSON.stringify(result);
}

export async function sendGroup(sessionList: any[], respPacket: string) {
    sessionList.forEach(e => {
        e.client.send(respPacket);
    });

    console.log(`group send resp msg:${respPacket}`); // 그룹별로 출력하면 너무 많으니 편의상 한번만
}