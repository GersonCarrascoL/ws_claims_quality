'use strict'

const userModel = require('../models/userModel'),
    jwtService = require('../util/jwt'),
    um = new userModel(),
    jwt = new jwtService(),
    bcrypt = require('bcryptjs')

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
                bcrypt.compare(user.userPassword, data[0][0].password, function (error, response) {
                    console.log(response)
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
                            token: jwt.createToken(user)
                        })
                    } else {
                        return res
                            .status(202)
                            .send({
                                message: 'User y/o password incorrect'
                            })

                    }
                })
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

        bcrypt.hash(user.userPassword, 10, function (err, hash) {
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
                    if (data[0][0]['response'] == 1) {
                        return res
                            .status(201)
                            .send({
                                message: 'User created'
                            })
                    } else if (data[0][0]['response'] == 0) {
                        return res
                            .status(202)
                            .send({
                                message: 'User created, waiting for a confirmation'
                            })
                    }
                }
            })
        })

    }

    userProfile(req,res){
        
    }
}

module.exports = UserController
