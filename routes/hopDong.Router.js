const express = require('express');
const router =express.Router();
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware')
const hopDongController = require('../controllers/hopDong.controller')

router.use(checkLogin);

router.get('/',hopDongController.getAll)
router.post('/',hopDongController.create)
router.patch('/:id/update',hopDongController.update)
router.delete('/:id/delete',hopDongController.delete)
module.exports = router;