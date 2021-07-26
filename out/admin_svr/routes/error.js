"use strict";
// import { LoggerAdmin } from "../../common/logger";
// import { Result } from "../../packet/jsonStructs";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorPage = void 0;
function errorPage(sqlMsg, res) {
    var error = new Error();
    error.name = "DBError"; // TODO: admin의 경우 이 부분 errorcode 분할 (db, invailed param)
    //error.result = Result.DBError;
    error.result = "DBError";
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
exports.errorPage = errorPage;
//# sourceMappingURL=error.js.map