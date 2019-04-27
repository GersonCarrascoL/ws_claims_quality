'use strict'

const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    uc = new userController(),
    auth = require('../middlewares/auth')

router
    .post('/api/v1/users/signin', uc.userLogin)
    .post('/api/v1/users/signup', uc.userRegister)
    .get('/api/v1/users',auth,uc.userProfile)
    .post('/api/v1/users/claims',uc.userClaim)

module.exports = router