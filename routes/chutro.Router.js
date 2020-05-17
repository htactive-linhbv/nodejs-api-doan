const express = require('express');
const router = express.Router();
const chutroController = require('../controllers/chutro.Controller');
const checkLogin = require('../middlewares/checkChuTroLogin.Middleware');

router.get('/',chutroController.get)
router.get('/:page/page',chutroController.getPage)
router.get('/:id/chitiet', chutroController.getId)
router.post('/themmoi/', chutroController.create)
router.patch('/:id/update',chutroController.update)
router.delete('/:id/delete',chutroController.delete)
router.get('/getchutro',checkLogin,chutroController.getchuTro)


module.exports = router;    