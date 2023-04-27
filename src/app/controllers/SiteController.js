class SiteController {
    index(red, res) {

        // results = connection.query('SELECT * FROM `accounts`', function(error, results, fields) {});
        let results = {
            name: 'thiblue',
            age: 30
        }

        var text = "";
        for (var key in results) {
            text += results[key];
        }
        res.render('home', { data: text });
        // datane = connection.query('SELECT * FROM `accounts`', function(error, results, fields) {
        //     if (error) throw error;

        //     res.render('home', { data: datane });
        // });
    }

    intro(red, res) {
        res.render('intro');
    }
}
module.exports = new SiteController;