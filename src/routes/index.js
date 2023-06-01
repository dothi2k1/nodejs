const newRouter = require('./news')
const siteRouter = require('./site')
const adminRouter = require('./admin')




function route(app) {

    app.use('/admin', adminRouter)
    app.use('/news', newRouter)
    app.use('/', siteRouter)


}

module.exports = route