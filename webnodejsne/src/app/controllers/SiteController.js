class SiteController {
    index(red, res) {
        res.render('home');
    }
    intro(red, res) {
        res.render('intro');
    }
}
module.exports = new SiteController;