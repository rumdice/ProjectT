"use strict";

import express from "express";
import path from 'path';
import database from '../common/database';

import routes from './routes/home';
import login from './routes/login';
import users from './routes/user';
import cheat from './routes/cheat';
import test from './routes/test';
// import logs from './routes/log';
// import { LoggerAdmin } from "../common/logger";

const app = express();

(async () => {
    // database Init
    //await Promise.all([database.init()]);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static(path.join(__dirname, 'public')));

    // 모듈 경로
    app.use('/', login);        // 로그인 (첫 페이지)
    app.use('/home', routes);   // 홈 (대시보드 같은 거)
    app.use('/user', users);    // 유저
    app.use('/cheat', cheat);   // 치트
    //app.use('/logs', logs);     // 로그
    app.use('/test', test);     // 테스트    
    
    // set port
    let port = process.env.PORT || 5000; // 디버깅 환경 고려
    app.set('port', port);

    // start admin server
    app.listen(app.get('port'), () => {
        console.log("admin server start on");
        //LoggerAdmin.info(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`);
    });
})();