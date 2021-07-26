"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateDiff = exports.clamp = exports.randomFloat = exports.randomInt = exports.dbError = exports.panic = exports.generateStringTag = exports.getControllerList = exports.loadLogDir = exports.loadLogFile = exports.loadConfig = void 0;
var fs_1 = __importDefault(require("fs"));
//import { Result } from "../packet/jsonStructs";
// import { SECRET_KEY } from "./define";
function loadConfig(path) {
    return JSON.parse(fs_1.default.readFileSync(path, 'utf8'));
}
exports.loadConfig = loadConfig;
function loadLogFile(path) {
    return fs_1.default.readFileSync(path, 'utf8');
}
exports.loadLogFile = loadLogFile;
function loadLogDir(path) {
    return fs_1.default.readdirSync(path); // encoding default utf8
}
exports.loadLogDir = loadLogDir;
function getControllerList(path) {
    var conList = fs_1.default.readdirSync(path); // encoding default utf8
    var conNames = [];
    conList.forEach(function (e) {
        var filetype = e.split(".");
        if (filetype[1] === 'ts') {
            conNames.push(filetype[0]);
        }
    });
    return conNames;
}
exports.getControllerList = getControllerList;
function generateStringTag(length) {
    var source = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';
    return __spreadArray([], Array(length)).map(function () { return source[Math.floor(Math.random() * source.length)]; }).join('');
}
exports.generateStringTag = generateStringTag;
function panic(result, message, packet, param) {
    var error = new Error();
    error.name = "PanicError";
    error.result = result;
    error.message = message;
    return error;
}
exports.panic = panic;
function dbError(sqlMsg) {
    var error = new Error();
    error.name = "DBError";
    error.result = "DBError";
    error.message = sqlMsg;
    return error;
}
exports.dbError = dbError;
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randomInt = randomInt;
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randomFloat = randomFloat;
function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
exports.clamp = clamp;
function getDateDiff(datetime1, datetime2) {
    var date1 = Date.UTC(datetime1.getUTCFullYear(), datetime1.getUTCMonth(), datetime1.getUTCDate());
    var date2 = Date.UTC(datetime2.getUTCFullYear(), datetime2.getUTCMonth(), datetime2.getUTCDate());
    return Math.floor((date1 - date2) / 86400000);
}
exports.getDateDiff = getDateDiff;
//# sourceMappingURL=util.js.map