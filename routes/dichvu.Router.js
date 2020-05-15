const express = require('express');
const router = express.Router();
const dichvuController = require('../controllers/dichvu.Controller')
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware')

router.use(checkLogin);
router.get('/',dichvuController.getAll);
router.get('/:id/chitiet',dichvuController.getID)
router.post('/',dichvuController.create)
router.patch('/:id/update',dichvuController.update)
router.delete('/:id/delete',dichvuController.delete)

module.exports = router;