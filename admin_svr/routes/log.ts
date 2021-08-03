import express = require('express');
import { readApiErrorDir, readApiErrorLog } from '../../common/logger';

let res_view = 'log';
let res_body = {
    title: 'log',
    logNameList: [""],
    logDataList: [""],
    idx: 0
};

let viewLogRes = 'logRes';

const router = express.Router();
router.get('/', (req, res) => {
    let logDir = readApiErrorDir();
    let logNames: string[] = [];

    logDir.forEach(e => {
        let filetype = e.split(".");
        if (filetype[1] === 'log') {
            logNames.push(filetype[0]);
        }
    });

    res_body.logNameList = logNames;
    res.render(res_view, res_body);
});

router.post('/detail', (req, res) => {
    
    let logDir = readApiErrorDir();
    let logNames: string[] = [];
    let logDatas: string[] = [];
    
    logDir.forEach(e => {
        let filetype = e.split(".");
        if (filetype[1] === 'log') {
            logNames.push(filetype[0]);
        }
    });
    
    logNames.forEach(e => {
        let logData = readApiErrorLog(e).toString();
        logData = logData.replace(/\r/g, "");

        logDatas.push(logData);
    });

    res_body.idx = req.body.bidx;
    res_body.logNameList = logNames;
    res_body.logDataList = logDatas;
    res.render(viewLogRes, res_body);  // post 결과를 해당 페이지의 modal로 표현하고 싶지만, 일단 별도 페이지에 render.
});

export default router;