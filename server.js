'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul = require('express-method-override')('_method'),
    port = (process.env.PORT || 5000),
    app = express(),
    server = require('./util/init')(app),

    // CALL ROUTERS
    userRouter = require('./routes/userRoutes')


app
    .set('port', port)

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan('dev'))
    .use(restFul)
    .use(userRouter)

server.listen(port)