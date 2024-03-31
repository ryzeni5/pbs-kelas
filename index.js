const express = require('express')
const app = express()
const port = 3002

// memanggil request body-parser
const bodyParser = require('body-parser')

// memanggil file config.js
const db = require('./config.js')

// memanggil file requst.js
const response = require('./request.js')

//menggunakan body-parser
app.use(bodyParser.json())

// route get mahasiswa semua data mahasiswa
app.get('/mahasiswa', (req,res)=>{
    const sql = 'SELECT * FROM tb_mahasiswa'
    db.query(sql,(error, result)=>{
      response(200,result,'data mahasiswa',res)
    })
  })


  // route get mahasiswa dengan pemanggilan npm
  app.get('/mahasiswa/:npm', (req,res)=>{
    const npm = req.params.npm
    const sql =  `SELECT * FROM tb_mahasiswa where npm ='${npm}'`
    db.query(sql, (err,result)=>{
      if(err) throw err
      response(200,result,"get detail mahasiswa", res)
    })
  })

// route post mahasiswa untuk menambahkan data mahasiswa
app.post('/mahasiswa', (req, res)=>{
  const { nama, npm, alamat } = req.body
  const sql = `INSERT INTO tb_mahasiswa (nama, npm, alamat) VALUES ('${nama}', '${npm}', '${alamat}');`

  db.query(sql,(error, Fields)=>{
    if (error) response(500, 'invalid',  `${nama} degan npm ${npm} sudah ditambahkan`, res)
    if (Fields?.affectedRows){
      const data={
        isSucces: Fields.affectedRows,
        id:Fields.insertId,
      }
      response(200, data,"Data Berhasil Disimpan", res)
    }
  })
})

//update data
app.put("/mahasiswa", (req, res) => {
  const { nama, npm, alamat } = req.body;
  const sql = `UPDATE tb_mahasiswa SET nama='${nama}', npm='${npm}', alamat='${alamat}' WHERE npm='${npm}'`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", `error`, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };

      response(200, data, "Data Berhasil Diupdate", res);
    } else {
      response(404, "not found", "error", res);
    }
  });
});

//detelete dataa
app.delete("/mahasiswa", (req, res) => {
  const { npm } = req.body;
  const sql = `DELETE FROM tb_mahasiswa where npm ='${npm}'`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };

      response(200, data, "data Berhasil dihapus", res);
    } else {
      response(404, "not found", "error", res);
    }
  });
});

app.listen(port, () => {
    console.log(`Runing in port ${port}`)
})