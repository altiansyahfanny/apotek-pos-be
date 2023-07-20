const express = require('express');
const router = express.Router();
const validatiorMiddleware = require('../middlewares/validatorMiddleware');
const { warehouseController } = require('../controllers/index');
const { create } = require('../validator/supplierValidator');

router.get('/', warehouseController.getAll);
router.post('/', create, validatiorMiddleware, warehouseController.create);

module.exports = router;
