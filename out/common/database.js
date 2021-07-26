"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTransaction = exports.CURRENT_TIMESTAMP = exports.sqlformat = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var util_1 = require("./util");
var define_1 = require("./define");
exports.sqlformat = promise_1.default.format;
exports.CURRENT_TIMESTAMP = { toSqlString: function () { return 'CURRENT_TIMESTAMP()'; } };
function doTransaction(callback) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.db.getConnection()];
                case 1:
                    conn = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 8, 9]);
                    return [4 /*yield*/, conn.beginTransaction()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, callback(conn)];
                case 4:
                    result = _a.sent();
                    return [4 /*yield*/, conn.commit()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    err_1 = _a.sent();
                    return [4 /*yield*/, conn.rollback()];
                case 7:
                    _a.sent();
                    throw err_1;
                case 8:
                    conn.release();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/, result];
            }
        });
    });
}
exports.doTransaction = doTransaction;
exports.default = {
    init: function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, connectionPool;
            return __generator(this, function (_a) {
                path = "";
                if (process.env.NODE_ENV === "production") {
                    path = define_1.CONFIG_PATH_DB_REAL;
                }
                else if (process.env.NODE_ENV === "qa") {
                    path = define_1.CONFIG_PATH_DB_QA;
                }
                else {
                    path = define_1.CONFIG_PATH_DB_DEV; // "development (default)"
                }
                connectionPool = promise_1.default.createPool(util_1.loadConfig(path));
                Object.defineProperty(module.exports, 'db', { value: connectionPool });
                console.log('database is initialized.');
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=database.js.map