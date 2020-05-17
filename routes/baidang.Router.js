const express = require('express');
const router = express.Router();
const baiDangController = require('../controllers/baidang.Controller');
const upload = require('../middlewares/uploadImageBaiDang.Middleware');
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware');
const checkAdminLogin = require('../middlewares/checkAdminLogin.Middleware');

router.get('/',checkLogin,baiDangController.getAll);
router.get('/:id/chitiet',baiDangController.getId);
router.post('/',checkLogin,upload.array('photos'),baiDangController.create);
router.delete('/:id/delete',baiDangController.delete);
router.get('/baidang',baiDangController.getBaiDang);
router.get('/baidang/all',checkAdminLogin, baiDangController.getAdmin);
module.exports = router;