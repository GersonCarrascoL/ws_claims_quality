'use strict'

const mysql = require('mysql'),
    config = require('./config'),
    
    dbOptions = {
        host : config.mysql.host,
        user : config.mysql.user,
        password : config.mysql.password,
        port : config.mysql.port,
        database : config.mysql.database
    },
    conn = mysql.createConnection(dbOptions)

conn.connect( (err)=>{
    return (err)
        ?console.log(`Error al conectar a Mysql : ${err.starck}`)
        :console.log(`Conexion establecida con Mysql N° : ${conn.threadId}`)
})

module.exports = conn
