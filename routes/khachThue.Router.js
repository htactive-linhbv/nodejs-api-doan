const express = require('express');
const router = express.Router();
const khachThueController = require('../controllers/khachThue.Controller')
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware')
const upload = require('../middlewares/uploadImage.Middleware')


router.get('/', checkLogin, khachThueController.get);
router.get('/:id/chitiet', checkLogin, khachThueController.getId);
router.post('/', checkLogin, upload.fields([
    { name: 'anhDaiDien' },
    { name: 'anhCMNDTruoc' },
    { name: 'anhCMNDSau' }
]), khachThueController.create);
router.patch('/:id/update', checkLogin, khachThueController.update)
router.delete('/:id/delete', checkLogin, khachThueController.delete)
router.get('/getkhachthue',checkLogin,khachThueController.getKhachThue);
router.get('/getallkhachthue',checkLogin,khachThueController.getKhachThueAll);

module.exports = router;