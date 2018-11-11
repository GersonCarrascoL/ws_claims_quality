'use strict'

const jwt = require('jsonwebtoken'),
config = require('../config')

class JWToken {
    createToken(user) {
        const payload = {
            id: user.id,
            email: user.email
        }

        return jwt.sign(payload, config.SECRET_TOKEN)
    }
}

module.exports = JWToken