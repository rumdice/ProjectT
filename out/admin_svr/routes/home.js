"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var res_view = 'home';
var res_body = {
    title: 'home'
};
var router = express.Router();
router.get('/', function (req, res) {
    res.render(res_view, res_body);
});
exports.default = router;
//# sourceMappingURL=home.js.map