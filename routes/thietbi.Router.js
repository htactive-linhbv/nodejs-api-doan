const express = require('express');
const router = express.Router();
const thietBiController = require('../controllers/thietbi.Controller')

router.get('/',thietBiController.getAll)
router.get('/:id/chitiet',thietBiController.getID)
router.post('/',thietBiController.create)
router.patch('/:id/update',thietBiController.update)
router.delete('/:id/delete',thietBiController.delete)

module.exports = router;