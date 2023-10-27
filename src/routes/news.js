var express = require('express');
var router = express.Router();

var newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show);

router.get('/', newsController.index); // tuyến đường gốc "/" luôn được viết ở dòng dưới cùng.

module.exports = router;
