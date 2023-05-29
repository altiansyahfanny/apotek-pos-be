const express = require('express');
const router = express.Router();
const validatiorMiddleware = require('../middlewares/validatorMiddleware');
const { supplierController } = require('../controllers/index');
const { create } = require('../validator/supplierValidator');

router.get('/', supplierController.getAll);
router.post('/', create, validatiorMiddleware, supplierController.create);

module.exports = router;
