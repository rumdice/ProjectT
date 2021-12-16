import express from "express"
import path from 'path'
import database from "../common/database"

import routes from './routes/home'
import login from './routes/login'
import users from './routes/user'
import cheat from './routes/cheat'
import test from './routes/test'
import logs from './routes/log'
import { LoggerAdmin } from "../common/logger"

const app = express();

(async () => {
    await Promise.all([database.init()])

    // view engine setup
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(express.static('public'))
    app.use(express.static(path.join(__dirname, 'public')))

    // module path
    app.use('/', login)
    app.use('/home', routes)
    app.use('/user', users)
    app.use('/cheat', cheat)
    app.use('/logs', logs)
    app.use('/test', test)

    // set port
    const port = process.env.PORT
    app.set('port', port)

    // start admin server
    app.listen(app.get('port'), () => {
        // TODO: 개선방향 - 좀더 low 한 레벨에서 빌드 환경에 따른 로깅 방식 세분화 하기
        // ex) 개발자 local에서는 콘솔만, dev 서버에는 파일로, live 환경에서는 파일 + mongodb 등 Nosql db로 남기기.
        // fluentd 를 쓸까? 흠..

        // tslint:disable-next-line: no-console
        console.log(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`)

        // LoggerAdmin.info(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`);
    })
})()