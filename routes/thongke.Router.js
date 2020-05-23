const express = require('express');
const router = express.Router();
const thongkeController = require('../controllers/thongke.Controller');
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware');
router.get('/', checkLogin, thongkeController.get);

module.exports = router;

