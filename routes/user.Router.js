const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller');

router.get('/:id', userController.getId)
router.get('/getAll', userController.getAll)
router.get('/page:id')
router.post('/create', userController.create)
router.patch('/:id/update', userController.update)
router.delete('/:id/delete', userController.delete)
router.post('/:id/changePassword')

module.exports = router;