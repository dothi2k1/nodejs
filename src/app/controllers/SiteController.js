const accountModel = require('../models/accountModel');
const axios = require('axios');
const querystring = require('querystring');
const connection = require('../../configs/connectDB')


class SiteController {
    index(req, res) {


        const itemsPerPage = 10;
        const totalItems = 100;

        // Trang hiện tại (lấy từ query parameter hoặc mặc định là 1)
        const currentPage = parseInt(req.query.page) || 1;

        // Tính toán vị trí phần tử bắt đầu và kết thúc trên trang hiện tại
        const startItem = (currentPage - 1) * itemsPerPage;
        const endItem = startItem + itemsPerPage - 1;

        // Tổng số trang
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Dữ liệu giả
        const data = [];
        for (let i = 1; i <= totalItems; i++) {
            data.push(`Item ${i}`);
        }

        // Dữ liệu của trang hiện tại
        const currentPageData = data.slice(startItem, endItem + 1);
        // console.log(totalPages)
        // Render template và truyền dữ liệu vào


        // Gọi hàm lấy danh sách tài khoản từ accountModel
        accountModel.getAllAccounts((error, results) => {
            if (error) {
                // console.log(error);
                res.status(500).send('Lỗi khi lấy danh sách tài khoản');
            } else {
                // Hiển thị danh sách tài khoản lên trang home
                for (let i = 1; i <= totalItems; i++) {
                    results.push(`Item ${i}`);
                }

                // Dữ liệu của trang hiện tại
                const currentPageData = results.slice(startItem, endItem + 1);
                res.render('page/home', {
                    data: currentPageData,
                    currentPage: currentPage,
                    pages: [1, 2, 3, 4, 5],
                    totalPages: totalPages
                });
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


        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // console.log(response.data);
                res.render('intro', { data: response.data });
            })
            .catch(error => {
                console.log(error);
            });


    }
}
module.exports = new SiteController;