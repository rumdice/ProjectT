// import { LoggerAdmin } from "../../common/logger";
// import { Result } from "../../packet/jsonStructs";


export function errorPage(sqlMsg: string, res: any) {
    const error: any = new Error();
    error.name = "DBError";             // TODO: admin의 경우 이 부분 errorcode 분할 (db, invailed param)
    //error.result = Result.DBError;
    error.result = "DBError"
    error.message = sqlMsg;
   
    // error logging
    // LoggerAdmin.error(`ServerPID: ${process.pid},
    // ResultCode: ${error.result}, 
    // Message: ${sqlMsg}, 
    // Stack: ${error.stack} \\end`
    // );

    // error page render
    res.render('error', { title: 'Error' });
}