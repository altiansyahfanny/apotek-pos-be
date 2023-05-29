const express = require('express');
const { purchaseContoller } = require('../controllers/index');
const router = express.Router();

router.get('/', purchaseContoller.getAll);

module.exports = router;
