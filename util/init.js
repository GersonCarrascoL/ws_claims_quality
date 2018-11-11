'use strict'

let init = function(app) {
    const server = require('http').Server(app)

    return server
}

module.exports = init