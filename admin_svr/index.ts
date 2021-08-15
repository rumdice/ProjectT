import express from "express";
import path from 'path';

import database from "../common/database";

import routes from './routes/home';
import login from './routes/login';
import users from './routes/user';
import cheat from './routes/cheat';
import test from './routes/test';
import logs from './routes/log';
import { PORT_SVR_ADMIN } from "../common/define";
import { LoggerAdmin } from "../common/logger";

const app = express();

(async () => {
    // database Init
    await Promise.all([database.init()])

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
    app.use('/logs', logs);     // 로그
    app.use('/test', test);     // 테스트

    // set port
    const port = process.env.PORT || PORT_SVR_ADMIN;
    app.set('port', port);

    // start admin server
    app.listen(app.get('port'), () => {
        // TODO: 개선방향 - 좀더 low 한 레벨에서 빌드 환경에 따른 로깅 방식 세분화 하기
        // ex) 개발자 local에서는 콘솔만, dev 서버에는 파일로, live 환경에서는 파일 + mongodb 등 Nosql db로 남기기.
        // fluentd 를 쓸까? 흠..

        // tslint:disable-next-line: no-console
        console.log(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`);

        // console.log는 production code에 적합하지 않으니 경고창이 뜸. 우와, 위에 처럼 주석 달면 노란줄 안뜸.
        // LoggerAdmin.info(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`);
    });
})();