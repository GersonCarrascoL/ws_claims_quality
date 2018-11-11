'use strict'

const jwt = require('jsonwebtoken'),
config = require('../config')

class JWToken {
    createToken(id) {
        const payload = {
            id: id
        }

        return jwt.sign(payload, config.SECRET_TOKEN)
    }

    decodeToken(token){
        let decoded = jwt.decode(token);
        return decoded;
    }
}

module.exports = JWToken