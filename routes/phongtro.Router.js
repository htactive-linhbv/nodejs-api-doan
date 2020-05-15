const express = require('express');
const router = express.Router();
const phongTroController = require('../controllers/phongtro.Controller')
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware');



 router.use(checkLogin);

 router.get('/:id/dataphong',phongTroController.getphongtro)
// router.get('/');
 router.get('/:id/chitiet',phongTroController.getId)
// router.get('/:id/getkhutro')
 router.post('/',phongTroController.create)
 router.patch('/:id/update',phongTroController.update)
 router.delete('/:id/:khuTro_id/delete',phongTroController.delete)
router.get('/:id/chitietkhachthue',phongTroController.getChiTietKhachThue)
router.post('/addkhachthue',phongTroController.addkhachthue)
router.post('/deletekhachthue',phongTroController.deleteKhachThue)
router.patch('/:id/traphong',phongTroController.traPhong)

module.exports = router;