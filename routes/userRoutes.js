'use strict'

const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    uc = new userController()

router
    .post('/api/v1/users/singin', uc.userLogin)
    .post('/api/v1/users/singup', uc.userRegister)
    .get('/api/v1/users/:id',uc.userProfile)

module.exports = router