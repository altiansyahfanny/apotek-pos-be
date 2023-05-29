const express = require('express');
const { productUnitController } = require('../controllers/index');
const router = express.Router();

router.get('/', productUnitController.getAll);

module.exports = router;
