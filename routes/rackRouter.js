const express = require('express');
const { rackController } = require('../controllers/index');
const router = express.Router();

router.get('/', rackController.getAll);

module.exports = router;
