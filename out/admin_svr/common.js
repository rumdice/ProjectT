"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminInfo = exports.checkLogin = exports.setLogin = exports.ADMIN_PWD = exports.ADMIN_ID = exports.isLogin = void 0;
//import { loadConfig } from "../common/util";
exports.isLogin = false;
exports.ADMIN_ID = "admin";
exports.ADMIN_PWD = "pass";
function setLogin() {
    exports.isLogin = true;
}
exports.setLogin = setLogin;
function checkLogin() {
    return exports.isLogin;
}
exports.checkLogin = checkLogin;
function checkAdminInfo(id, pwd) {
    return (id === exports.ADMIN_ID && pwd === exports.ADMIN_PWD) ? true : false;
}
exports.checkAdminInfo = checkAdminInfo;
// export function doCheat(_url: string, _user_uuid: string) {
//     let config = (process.env.NODE_ENV === "production") ? "live" : "dev"  // production or development(local)
//     let packetInfo = {
//         url: _url,                                          // protocol
//         body: JSON.stringify({user_uuid: _user_uuid}),       // packet body - only cheat json
//     };
//     let serverInfo : any;
//     let testerConfig = loadConfig('./config/tester.json');
//     for (let e of testerConfig.servers) {
//         if (e.name === config) {
//             serverInfo = e;
//             break;
//         }
//     }
//     let options = {
//         host: serverInfo.address,
//         port: serverInfo.port,
//         path: packetInfo.url,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     let req : any;
//     req = (config === "local") ? httprequest(options, response => {printf(response)}) : httpsrequest(options, response => {printf(response)});  // local or dev,live
//     req.write(packetInfo.body);
//     req.end();
//     return (response.statusCode === 200) ? true : false;
// }
function printf(e) {
    console.log(e.statusCode);
    console.log(e.statusMessage);
}
//# sourceMappingURL=common.js.map