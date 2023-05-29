const express = require('express');
const { productController } = require('../controllers/index');
const validatiorMiddleware = require('../middlewares/validatorMiddleware');
const { create } = require('../validator/productValidator');
const router = express.Router();

router.get('/', productController.getAll);
router.post('/', create, validatiorMiddleware, productController.create);

module.exports = router;
