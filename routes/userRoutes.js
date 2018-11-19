'use strict'

const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    uc = new userController(),
    // multer = require('multer'),

    // storage = multer.diskStorage({
    //     destination: function(req,file,cb){
    //         cb(null,__dirname+'/../uploads/')
    //     },
    //     filename: function(req,file,cb){
    //         cb(null,file.originalname)
    //     }
    // }),
    // fileFilter = (req,file,cb)=>{
    //     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    //         cb(null,true)
    //     }else{
    //         cb(null,false)
    //     }
    // },
    // upload = multer({ 
    //     storage: storage,
    //     limits: {
    //         fileSize: 1024 * 1024 * 5
    //     },
    //     fileFilter: fileFilter
    // }),

    auth = require('../middlewares/auth')

router
    .post('/api/v1/users/signin', uc.userLogin)
    .post('/api/v1/users/signup', uc.userRegister)
    .get('/api/v1/users',auth,uc.userProfile)
    .post('/api/v1/users/claims',uc.userClaim)

module.exports = router