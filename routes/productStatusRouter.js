const express = require('express');
const { productStatusController } = require('../controllers/index');
const router = express.Router();

router.get('/', productStatusController.getAll);

module.exports = router;
