const express = require('express');
const { productCategoryController } = require('../controllers/index');
const router = express.Router();

router.get('/', productCategoryController.getAll);

module.exports = router;
