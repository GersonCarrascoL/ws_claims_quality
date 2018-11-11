'use strict'

const config = require('../config'),
    jwt = require('jsonwebtoken')


function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            status : 401,
            message: `Access forbidden`})
    }
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, config.SECRET_TOKEN, function(err, decoded) {
        if(decoded == undefined){
            return res.status(403).send({
                status : 403 ,
                message : `Access forbidden`})
        }
        next()
    })
}

module.exports = isAuth
