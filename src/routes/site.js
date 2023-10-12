var express = require('express');
var router = express.Router();

var siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);

router.use('/', siteController.index);

module.exports = router;
