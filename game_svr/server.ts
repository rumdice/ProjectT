import express, { Router } from "express";
import database from "../common/database";
import { getControllerList } from "../common/util";
import { COOKIE_HEADER, PORT_SVR_GAME } from "../common/define";
import { ErrorCode } from "../packet/commonPacket";
import { getCookie, updateSession } from "../common/session";

const app = express();

export const gameServer = async () => {
    await Promise.all([database.init()]);

    //const cron = new CronTest(); // create and start cron job

    app.use(express.json());

    let router = express.Router()
    let controllerList = getControllerList('./game_svr/controller');
    for (let controller of controllerList) {
        console.log(`bind controller "${controller}"`);
        bindController(router, require(`./controller/${controller}`));
    }

    app.use(process.env.ROUTE || '/', router);

    const port = process.env.PORT || PORT_SVR_GAME;
    app.set('port', port);

    app.listen(app.get('port'), () => {
        if (process.send) {
            process.send('ready');
        }
    });
};




function bindController(router: Router, module: any) {
    type ControllerBinder = (cookie: any, param: any) => Promise<any>;

    function process(cookie: any, param: any, callback: ControllerBinder, res: any) {
        callback(cookie, param)
            .then(async result => {

                // cookie 정보로 session 셋팅
                const newCookie = await updateSession(cookie);
                if (newCookie !== undefined) {
                    res.set(COOKIE_HEADER, newCookie);
                }

                let ret = result;
                if (result === undefined) {
                    ret = { error: ErrorCode.Success };
                }

                if (typeof result === 'number') {
                    ret = { error: result };
                }

                res.json(ret);
            })
            .catch(reason => {
                let cb = callback;
                let errName = reason.name || "InternalError";
                let errCode = reason.result || ErrorCode.InternalError;
                let errMsg = reason.message;
                let errStack = reason.stack;

                // let totalErrorMsg = `
                // Packet: /${cb.name},
                // RecvParam: ${JSON.stringify(param)},
                // ErrorName: ${errName},
                // ResultCode: ${errCode},
                // CallStack: ${errStack},
                // Message: ${errMsg}\\end`;
                // LoggerGame.error(totalErrorMsg);

                let totalErrorMsgToClient = `Packet:/${cb.name}, RecvParam:${JSON.stringify(param)}, ErrorName:${errName}, ResultCode:${errCode}, Message:${errMsg} \\end`;
                res.json({
                    error: errCode,
                    message: totalErrorMsgToClient
                });
            });
    }

    for (let entry of Object.entries(module)) {
        const path = `/${entry[0]}`;
        const binder = <ControllerBinder>entry[1];
        router.post(path, (req, res) => process(getCookie(req.header(COOKIE_HEADER)), req.body, binder, res));
    }

    if (typeof module === 'function') {
        module();
    }
}