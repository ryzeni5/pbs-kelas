const mysql = require('mysql')

//koneksi ke database sesuaikan dengan nama database
const db = mysql.createConnection({
    host : 'sql6.freesqldatabase.com',
    user : 'sql6703636',
    password :'28R3nGUYjG',
    database :'sql6703636'
})

module.exports = db