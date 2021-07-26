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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserGoods = exports.getUserGames = exports.getUserGoods = exports.getUserId = void 0;
var database_1 = require("../../common/database");
var define_1 = require("../../common/define");
var error_1 = require("../routes/error");
function getUserId(user_uuid, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.db.query("SELECT `id` FROM `user` WHERE `user_uuid` = ?", [user_uuid])];
                case 1:
                    user_row = (_a.sent())[0][0];
                    if (user_row === undefined) {
                        error_1.errorPage(define_1.dbErrorMsg.undefined, res);
                    }
                    return [2 /*return*/, user_row];
            }
        });
    });
}
exports.getUserId = getUserId;
function getUserGoods(user_id, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_goods_row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.db.query("SELECT `gold`, `diamond`, `diamond_google`, `diamond_apple` FROM `user_goods` " +
                        "WHERE `user_id` = ?", [user_id])];
                case 1:
                    user_goods_row = (_a.sent())[0][0];
                    if (user_goods_row === undefined) {
                        error_1.errorPage(define_1.dbErrorMsg.undefined, res);
                    }
                    return [2 /*return*/, user_goods_row];
            }
        });
    });
}
exports.getUserGoods = getUserGoods;
function getUserGames(user_id, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_game_row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.db.query("SELECT `total_highest_trophy`, `trophy_reward_step` FROM `user_game` " +
                        "WHERE `user_id` = ?", [user_id])];
                case 1:
                    user_game_row = (_a.sent())[0][0];
                    if (user_game_row === undefined) {
                        error_1.errorPage(define_1.dbErrorMsg.undefined, res);
                    }
                    return [2 /*return*/, user_game_row];
            }
        });
    });
}
exports.getUserGames = getUserGames;
function addUserGoods(user_id, gold, diamond, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.db.query("UPDATE `user_goods` " +
                        "SET `gold` = `gold` + ?, `diamond` = `diamond` + ? " +
                        "WHERE `user_id` = ?", [gold, diamond, user_id])];
                case 1:
                    result = (_a.sent())[0];
                    if (result.affectedRows === 0) {
                        error_1.errorPage(result.message, res);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.addUserGoods = addUserGoods;
//# sourceMappingURL=query.js.map