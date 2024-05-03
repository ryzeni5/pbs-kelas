const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const response = require('./response.js');

app.use(bodyParser.json());

// Membuat koneksi ke database
const db = mysql.createConnection({
  host : 'sql6.freesqldatabase.com',
  user : 'sql6703636',
  password :'28R3nGUYjG',
  database :'sql6703636'
});

// Menghubungkan ke database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Terhubung ke database MySQL');
});

// GET endpoint untuk mendapatkan data buku
app.get('/buku', (req, res) => {
    const sql = 'SELECT * FROM tb_buku';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data buku dari database', res);
        } else {
            response(200, result, 'Data buku berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data kategori
app.get('/kategori', (req, res) => {
    const sql = 'SELECT * FROM tb_kategori';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data kategori dari database', res);
        } else {
            response(200, result, 'Data kategori berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data pembeli
app.get('/pembeli', (req, res) => {
    const sql = 'SELECT * FROM tb_pembeli';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data pembeli dari database', res);
        } else {
            response(200, result, 'Data pembeli berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data transaksi
app.get('/transaksi', (req, res) => {
    const sql = 'SELECT * FROM tb_transaksi';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data transaksi dari database', res);
        } else {
            response(200, result, 'Data transaksi berhasil diambil dari database', res);
        }
    });
});

// POST endpoint untuk menambah data buku
app.post('/buku', (req, res) => {
    const { judul, penulis, tahun_terbit, harga, stok, id_kategori } = req.body;
    const sql = `INSERT INTO tb_buku (judul, penulis, tahun_terbit, harga, stok, id_kategori) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [judul, penulis, tahun_terbit, harga, stok, id_kategori], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data buku ke database', res);
        } else {
            response(200, result, 'Data buku berhasil ditambahkan ke database', res);
        }
    });
});

// POST endpoint untuk menambah data pembeli
app.post('/pembeli', (req, res) => {
    const { nama, alamat, email, nomor_telepon } = req.body;
    const sql = `INSERT INTO tb_pembeli (nama, alamat, email, nomor_telepon) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nama, alamat, email, nomor_telepon], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data pembeli ke database', res);
        } else {
            response(200, result, 'Data pembeli berhasil ditambahkan ke database', res);
        }
    });
});

// POST endpoint untuk menambah data transaksi
app.post('/transaksi', (req, res) => {
    const { id_pembeli, id_buku, jumlah, tanggal } = req.body;
    const sql = `INSERT INTO tb_transaksi (id_pembeli, id_buku, jumlah, tanggal) VALUES (?, ?, ?, ?)`;
    db.query(sql, [id_pembeli, id_buku, jumlah, tanggal], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data transaksi ke database', res);
        } else {
            response(200, result, 'Data transaksi berhasil ditambahkan ke database', res);
        }
    });
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});
