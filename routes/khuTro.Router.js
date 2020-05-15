const express = require('express');
const router = express.Router();
const khuTroController =require('../controllers/khuTro.Controller')
const checkLoginMiddeware = require('../middlewares/checkChuTroLogin.Middleware')


router.get('/',checkLoginMiddeware,khuTroController.getAll);
router.get('/:id/chitiet',checkLoginMiddeware,khuTroController.getId)
router.post('/',checkLoginMiddeware,khuTroController.create)
router.patch('/:id/update',checkLoginMiddeware,khuTroController.update)
router.delete('/:id/delete',checkLoginMiddeware,khuTroController.delete)
router.get('/getkhutro',checkLoginMiddeware,khuTroController.getKhuTro)
router.get('/getphongtro',checkLoginMiddeware,khuTroController.getPhongTro)
module.exports = router;