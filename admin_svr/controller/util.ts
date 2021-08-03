import { request as httprequest } from 'http';
import { request as httpsrequest} from 'https';
import { response } from 'express';
//import { loadConfig } from "../common/util";

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

function printf(e: any) {
    console.log(e.statusCode);
    console.log(e.statusMessage);
}