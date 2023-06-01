const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')
const userController = require('../app/controllers/UserController')

router.use('/user', userController.userEdit)
router.use('/intro', siteController.intro)
router.use('/', siteController.index)

module.exports = router;