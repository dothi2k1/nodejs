const accountModel = require('../models/accountModel');

class SiteController {
    index(red, res) {


        // Gọi hàm lấy danh sách tài khoản từ accountModel
        accountModel.getAllAccounts((error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send('Lỗi khi lấy danh sách tài khoản');
            } else {
                // Hiển thị danh sách tài khoản lên trang home
                res.render('home', { data: results });
            }
        });



    }

    intro(red, res) {
        res.render('intro');
    }
}
module.exports = new SiteController;