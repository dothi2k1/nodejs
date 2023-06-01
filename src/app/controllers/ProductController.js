const axios = require('axios');
const connection = require('../../configs/connectDB')


class ProductController {

    product(red, res) {
        // Lấy dữ liệu từ MySQL và in ra
        connection.query('SELECT * FROM products order by id desc', (error, results, fields) => {
            if (error) throw error;
            res.render('admin/product', { products: results });
        });

    }

    detailProduct(red, res) {
        const { id } = red.params;
        console.log(id)
        const sql = 'SELECT * FROM products WHERE id = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                res.send('Product not found');
            } else {
                res.render('admin/detailProduct', { product: result[0] });
            }
        });

    }
    editProduct(req, res) {

        if (req.method === 'POST') {
            // Lấy dữ liệu JSON từ request
            const { name, price, note } = req.body;
            console.log(name, price, note);
            // Chèn dữ liệu vào MySQL
            const sql = 'INSERT INTO products (name, price, note) VALUES (?, ?, ?)';
            connection.query(sql, [name || 'Lỗi', price || 'Lỗi', note || 'Lỗi'], (err, result) => {
                if (err) throw err;
                res.send(`User ${name} inserted into MySQL`);
            });
        } else if (req.method === 'PUT') {
            const { name, note, id } = req.body;
            connection.query(
                'UPDATE products SET name = ?, note = ? WHERE id = ?',
                [name, note, id],
                (error, results, fields) => {
                    if (error) throw error;
                    res.send(`Product id ${id} updated: ${name} ${note}`);
                }
            );
        }
        else if (req.method === 'DELETE') {
            const { id } = req.body;
            if (id == 0) {
                const sql = 'DELETE FROM products';
                connection.query(sql, (err, result) => {
                    if (err) throw err;
                    res.send(`Với ID = ${id} deleted all data from MySQL`);
                });
            } else {
                const sql = 'DELETE FROM products WHERE id = ?';
                connection.query(sql, [id], (err, result) => {
                    if (err) throw err;
                    res.send(`Account ${id} deleted from MySQL`);
                });
            }

        }
        else {
            // Lấy dữ liệu từ MySQL và in ra
            connection.query('SELECT * FROM products order by id desc', (error, results, fields) => {
                if (error) throw error;
                res.json(results);

            });

        }
    }
}
module.exports = new ProductController;