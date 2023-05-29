const express = require('express');
const { alternativePriceCategoryController } = require('../controllers/index');
const router = express.Router();

router.get('/', alternativePriceCategoryController.getAll);

module.exports = router;
