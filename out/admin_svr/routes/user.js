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
var express = require("express");
var common_1 = require("../common");
var query_1 = require("../query/query");
var error_1 = require("./error");
var res_view = 'user'; // .pug
var res_body = {
    title: 'user',
    goods: {
        gold: 0,
        diamond: 0,
        diamond_google: 0,
        diamond_apple: 0
    },
    trophy: {
        total_highest_trophy: 0,
        trophy_reward_step: 0,
    },
    user_uuid: "",
    user_id: ""
};
var router = express.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!common_1.checkLogin()) {
            error_1.errorPage("Login Fail", res);
        }
        res.render(res_view, res_body);
        return [2 /*return*/];
    });
}); });
router.post('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_uuid, user, goods, games;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_uuid = req.body.useruuid;
                return [4 /*yield*/, query_1.getUserId(user_uuid, res)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, query_1.getUserGoods(user.id, res)];
            case 2:
                goods = _a.sent();
                return [4 /*yield*/, query_1.getUserGames(user.id, res)];
            case 3:
                games = _a.sent();
                res_body.goods.gold = goods.gold;
                res_body.goods.diamond = goods.diamond;
                res_body.goods.diamond_google = goods.diamond_google;
                res_body.goods.diamond_apple = goods.diamond_apple;
                res_body.trophy.total_highest_trophy = games.total_highest_trophy;
                res_body.trophy.trophy_reward_step = games.trophy_reward_step;
                res_body.user_uuid = user_uuid;
                res_body.user_id = user.id;
                res.render(res_view, res_body);
                return [2 /*return*/];
        }
    });
}); });
router.post('/addgoods', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gold, diamond, diamond_google, diamond_apple, user_id, user_uuid, goods, games;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gold = req.body.add_gold;
                diamond = req.body.add_diamond;
                diamond_google = req.body.add_diamond_google;
                diamond_apple = req.body.add_diamond_apple;
                user_id = req.body.add_user_id;
                user_uuid = req.body.add_user_uuid;
                // check params
                if (gold === undefined || diamond === undefined) {
                    error_1.errorPage('invaild param', res);
                }
                if (gold === '') {
                    gold = 0;
                }
                if (diamond === '') {
                    diamond = 0;
                }
                return [4 /*yield*/, query_1.addUserGoods(user_id, gold, diamond, res)];
            case 1:
                _a.sent();
                return [4 /*yield*/, query_1.getUserGoods(user_id, res)];
            case 2:
                goods = _a.sent();
                return [4 /*yield*/, query_1.getUserGames(user_id, res)];
            case 3:
                games = _a.sent();
                res_body.goods.gold = goods.gold;
                res_body.goods.diamond = goods.diamond;
                res_body.goods.diamond_google = goods.diamond_google;
                res_body.goods.diamond_apple = goods.diamond_apple;
                res_body.trophy.total_highest_trophy = games.total_highest_trophy;
                res_body.trophy.trophy_reward_step = games.trophy_reward_step;
                res_body.user_uuid = user_uuid;
                res_body.user_id = user_id;
                res.render(res_view, res_body);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=user.js.map