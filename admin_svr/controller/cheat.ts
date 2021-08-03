import { request as httprequest } from 'http';
import { request as httpsrequest } from 'https';
import { response } from 'express';
import { dev, local } from '../../common/define';

export function doCheat(url: string, user_uuid: string) {
    // pm2 env 
    let serverInfo: any;
    if (process.env.NODE_ENV === "dev") {
        serverInfo = dev;
    }
    else if (process.env.NODE_ENV === "local") {
        serverInfo = local;
    }

    let packetInfo = {
        url: url,                                          // protocol
        body: JSON.stringify({ user_uuid: user_uuid }),    // packet body - only cheat json
    };

    let options = {
        host: serverInfo.address,
        port: serverInfo.port,
        path: packetInfo.url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let req: any;
    req = (process.env.NODE_ENV === "local") ? httprequest(options, response => { printf(response) }) : httpsrequest(options, response => { printf(response) });  // local or dev,live
    req.write(packetInfo.body);
    req.end();

    return (response.statusCode === 200) ? true : false;
}

function printf(e: any) {
    console.log(e.statusCode);
    console.log(e.statusMessage);
}