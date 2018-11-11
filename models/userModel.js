'use strict'

const conn = require('../util/mysqlConnection')

class UserModel {
    userLogin(email, cb) {
        conn.query('CALL sp_app_login(?)', [email], cb)
    }

    userRegister(user, cb) {
        conn.query('CALL sp_app_register(?,?,?,?,?,?,?,?,?,?)', [
            user.userName,
            user.userLastName,
            user.userEmail,
            user.userID,
            user.userPassword,
            user.userDNI,
            user.userGender,
            user.userDistrict,
            user.userOcupation,
            user.userScholarGrade
        ], cb)
    }

    userProfile(id,cb) {
        conn.query()
    }
}

module.exports = UserModel