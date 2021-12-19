import express from "express"
import path from 'path'

import database from "../common/database"
import { LoggerAdmin } from "../common/logger"

import routes from './routes/home'
import login from './routes/login'
import users from './routes/user'
import cheat from './routes/cheat'
import test from './routes/test'
import log from './routes/log'
import packet from './routes/packet'


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
    app.use('/log', log)
    app.use('/test', test)
    app.use('/packet', packet)

    // set port
    const port = process.env.PORT
    app.set('port', port)

    // start admin server
    app.listen(app.get('port'), () => {
        LoggerAdmin.info(`admin server start on port:${port}, process env:${process.env.NODE_ENV}`)
    })
})()