'use strict'

const conn = require('../util/mysqlConnection')

class UserModel {
    userLogin(email, cb) {
        conn.query('CALL sp_app_signin(?)', [
            email
        ], cb)
    }

    userRegister(user, cb) {
        conn.query('CALL sp_app_signup(?,?,?,?,?,?,?,?,?,?)', [
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
        conn.query('CALL sp_app_profile(?)',[
            id
        ],cb)
    }

    userClaim(claim,cb){
        conn.query('CALL sp_app_postClaim(?,?,?,?,?)',[
            claim.claimUserId,
            claim.claimDate,
            claim.claimMessage,
            claim.claimCellPhone,
            claim.claimUrlImage
        ],cb)
    }
}

module.exports = UserModel