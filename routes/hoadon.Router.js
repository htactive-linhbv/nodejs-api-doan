const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware');
const hoaDonController = require('../controllers/hoadon.Controller')

router.use(checkLogin)
router.get('/',hoaDonController.get)
router.get('/:id/chitiet')
router.post('/',hoaDonController.create)
router.patch('/:id/update',hoaDonController.update)
router.delete('/:id/delete',hoaDonController.delete)

module.exports = router;
