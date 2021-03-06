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

    .use(bodyParser.json({limit: 1024 * 1024 * 2000}))
    .use(bodyParser.urlencoded({ extended: false,limit: 1024 * 1024 * 2000 }))
    .use(morgan('dev'))
    .use(restFul)
    .use(userRouter)

    .use('*', function(req, res){
        res
        .status(404)
        .send({
            error: 'Url not exist'
        });
    });

server.listen(port)