const mysql = require('mysql')

//koneksi ke database sesuaikan dengan nama database
const db = mysql.createConnection({
    host : 'sql6.freesqldatabase.com',
    user : 'sql6695577',
    password :'37JRDLJEE3',
    database :'sql6695577'
})

module.exports = db