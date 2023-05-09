const connection = require('../../configs/connectDB')

// Định nghĩa hàm để lấy danh sách tài khoản
function getAllAccounts(callback) {
    connection.query('SELECT * FROM accounts', (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}

// Định nghĩa hàm để tạo mới tài khoản
function createAccount() {

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const postData = querystring.parse(body);
            console.log(postData);
            res.end(`Data received: ${JSON.stringify(postData)}`);
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    }

    // connection.query('INSERT INTO accounts SET ?', account, (error, result) => {
    //     if (error) {
    //         return callback(error, null);
    //     }
    //     return callback(null, result.insertId);
    // });
}

// Xuất các hàm để sử dụng ở bên ngoài module
module.exports = {
    getAllAccounts,
    createAccount
};