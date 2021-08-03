// import { Result } from "../../packet/jsonStructs";

import { LoggerAdmin } from "../../common/logger";


export function errorPage(sqlMsg: string, res: any) {
    const error: any = new Error();
    error.name = "DBError";
    error.result = "DBError"
    error.message = sqlMsg;

    // error logging
    LoggerAdmin.error(`ServerPID: ${process.pid},
    ResultCode: ${error.result}, 
    Message: ${sqlMsg}, 
    Stack: ${error.stack} \\end`
    );

    // error page render
    res.render('error', { title: 'Error' });
}