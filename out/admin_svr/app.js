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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
//import database from '../common/database';
var home_1 = __importDefault(require("./routes/home"));
var login_1 = __importDefault(require("./routes/login"));
var user_1 = __importDefault(require("./routes/user"));
var cheat_1 = __importDefault(require("./routes/cheat"));
//import logs from './routes/log';
var test_1 = __importDefault(require("./routes/test"));
//import { LoggerAdmin } from "../common/logger";
var app = express_1.default();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var port;
    return __generator(this, function (_a) {
        // database Init
        //await Promise.all([database.init()]);
        // view engine setup
        app.set('views', path_1.default.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.json());
        app.use(express_1.default.static('public'));
        app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // 모듈 경로
        app.use('/', login_1.default); // 로그인 (첫 페이지)
        app.use('/home', home_1.default); // 홈 (대시보드 같은 거)
        app.use('/user', user_1.default); // 유저
        app.use('/cheat', cheat_1.default); // 치트
        //app.use('/logs', logs);     // 로그
        app.use('/test', test_1.default); // 테스트    
        port = process.env.PORT || 5000;
        app.set('port', port);
        // start admin server
        app.listen(app.get('port'), function () {
            //LoggerAdmin.info(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`);
        });
        return [2 /*return*/];
    });
}); })();
//# sourceMappingURL=app.js.map