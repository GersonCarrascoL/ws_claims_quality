'use strict'

const userModel = require('../models/userModel'),
    jwtService = require('../util/jwt'),
    um = new userModel(),
    jwt = new jwtService(),
    bcrypt = require('bcryptjs'),
    SALTROUNDS = 10,
    // urlImageBase = 'http://localhost:5000/uploads/'
    urlImageBase = 'https://wsclaims.herokuapp.com/uploads/'

class UserController {
    userLogin(req, res) {
        let user = {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }
        
        um.userLogin(user.userEmail, (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .send({
                        message: err.stack
                    })
            }

            if (data[0][0] == undefined) {
                return res
                    .status(202)
                    .send({
                        message: 'User y/o password incorrect'
                    })
            } else {
                if(data[0][0].es_eliminado == "1"){
                    return res
                        .status(403)
                        .send({
                            message: 'User deleted'
                        })
                }else{
                    if(data[0][0].es_identificado == "1"){

                        bcrypt.compare(user.userPassword, data[0][0].password, function (error, response) {
        
                            if (error) {
                                return res
                                    .status(500)
                                    .send({
                                        message: err.stack
                                    })
                            }
                            if (response == true) {
                                return res.status(200).send({
                                    message: 'Login succesfully',
                                    idUsuario : data[0][0].idUsuario,
                                    token: jwt.createToken(data[0][0].idUsuario)
                                })
                            } else {
                                return res
                                    .status(202)
                                    .send({
                                        message: 'User y/o password incorrect'
                                    })
        
                            }
                        })
                    }else{
                        return res
                            .status(401)
                            .send({
                                message: 'User not verified'
                            })
                    }
                }
            }
        })
    }

    userRegister(req, res) {
        let user = {
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userEmail: req.body.userEmail,
            userID: req.body.userID,
            userPassword: req.body.userPassword,
            userDNI: req.body.userDNI,
            userGender: req.body.userGender,
            userDistrict: req.body.userDistrict,
            userOcupation: req.body.userOcupation,
            userScholarGrade: req.body.userScholarGrade
        }
        
        console.log(user);
        bcrypt.genSalt(SALTROUNDS, (err,salt)=>{
            if (err) { return next(err); }

            bcrypt.hash(user.userPassword, salt, (err, hash) => {
                user.userPassword = hash
    
                if (err) {
                    return res
                        .status(500)
                        .send({
                            message: err.stack
                        })
                }
    
                um.userRegister(user, (error, data) => {
                    console.log(data[0][0]['response'])
                    if (error) {
                        return res
                            .status(500)
                            .send({
                                message: error.stack
                            })
                    } else {
                        if (data[0][0]['response'] == -1) {
                            return res
                                .status(202)
                                .send({
                                    message: 'User already exist'
                                })
                        } else if (data[0][0]['response'] == 0) {
                            return res
                                .status(400)
                                .send({
                                    message: 'User created failed'
                                })
                        } else{
                            return res
                                .status(201)
                                .send({
                                    message: 'User created'
                                })
                        }
                    }
                })
            })
        })

    }

    userProfile(req,res){
        const token = req.headers.authorization.split(" ")[1]
        let payload = jwt.decodeToken(token)

        um.userProfile(payload.id, (err,data)=>{
            if (err) {
                return res
                    .status(500)
                    .send({
                        message: error.stack
                    })
            }

            if(data[0][0]['ocupacion'] == null) data[0][0]['ocupacion'] = ''
            if(data[0][0]['grado_educativo'] == null) data[0][0]['grado_educativo'] = ''
            if(data[0][0]['distrito'] == null) data[0][0]['distrito'] = ''
            if(data[0][0]['sexo'] == null) data[0][0]['sexo'] = ''
            
            return res
                .status(200)
                .send(
                    data[0][0]
                )
        })
    }

    userClaim(req,res){
        let claim = {
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userEmail: req.body.userEmail,
            userID: req.body.userID,
            userPassword: req.body.userPassword,
            userDNI: req.body.userDNI,
            userGender: req.body.userGender,
            userDistrict: parseInt(req.body.userDistrict),
            userOcupation: req.body.userOcupation,
            userScholarGrade: req.body.userScholarGrade,

            claimMessage: req.body.claimMessage,
            claimCellPhone: req.body.claimCellPhone,
            claimPhoto: req.body.claimPhoto
        }

        console.log(claim)
        bcrypt.genSalt(SALTROUNDS, (err,salt)=>{
            if (err) { return next(err); }
            
            bcrypt.hash(claim.userPassword, salt, (err, hash) => {
                claim.userPassword = hash
    
                if (err) {
                    return res
                        .status(500)
                        .send({
                            message: err.stack
                        })
                }
                um.userClaim( claim , (err,data)=>{
                    if (err) {
                        return res
                            .status(500)
                            .send({
                                message: err.stack
                            })
                    }
                    console.log(data)
                    if (data[0][0]['response'] == 1) {
                        return res
                            .status(201)
                            .send({
                                message: 'Claim send successfully'
                            })
                    } else if (data[0][0]['response'] == 0) {
                        return res
                            .status(202)
                            .send({
                                message: 'Error send claim'
                            })
                    }
                })
            })
        })
    }
}

module.exports = UserController
