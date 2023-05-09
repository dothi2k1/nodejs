const accountModel = require('../models/accountModel');
const axios = require('axios');
const querystring = require('querystring');
const connection = require('../../configs/connectDB')

class SiteController {
    index(red, res) {


        // Gọi hàm lấy danh sách tài khoản từ accountModel
        accountModel.getAllAccounts((error, results) => {
            if (error) {
                // console.log(error);
                res.status(500).send('Lỗi khi lấy danh sách tài khoản');
            } else {
                // Hiển thị danh sách tài khoản lên trang home
                res.render('home', { data: results });
            }
        });



    }


    editStudent(req, res) {

        if (req.method === 'POST') {
            // Lấy dữ liệu JSON từ request
            const { name, password, email } = req.body;
            console.log(name, password, email);
            // Chèn dữ liệu vào MySQL
            const sql = 'INSERT INTO accounts (name, password, email) VALUES (?, ?, ?)';
            connection.query(sql, [name || 'Lỗi', password || 'Lỗi', email || 'Lỗi'], (err, result) => {
                if (err) throw err;
                res.send(`User ${name} inserted into MySQL`);
            });
        } else if (req.method === 'PUT') {
            const { name, email, id } = req.body;
            connection.query(
                'UPDATE accounts SET name = ?, email = ? WHERE id = ?',
                [name, email, id],
                (error, results, fields) => {
                    if (error) throw error;
                    res.send(`Student with id ${id} updated: ${name} ${email}`);
                }
            );
        }
        else if (req.method === 'DELETE') {
            const { id } = req.body;
            if (id == 0) {
                const sql = 'DELETE FROM accounts';
                connection.query(sql, (err, result) => {
                    if (err) throw err;
                    res.send(`Với ID = ${id} deleted all data from MySQL`);
                });
            } else {
                const sql = 'DELETE FROM accounts WHERE id = ?';
                connection.query(sql, [id], (err, result) => {
                    if (err) throw err;
                    res.send(`Account ${id} deleted from MySQL`);
                });
            }

        }
        else {
            // Lấy dữ liệu từ MySQL và in ra
            connection.query('SELECT * FROM accounts order by id desc', (error, results, fields) => {
                if (error) throw error;
                res.json(results);

            });

        }
    }



    intro(red, res) {

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                res.render('intro', { data: json });
                // console.log(json)
            })

    }
}
module.exports = new SiteController;