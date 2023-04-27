class NewController {
    index(red, res) {
        res.render('news');
    }
    show(red, res) {
        res.render('news/tin1');
    }
}
module.exports = new NewController;