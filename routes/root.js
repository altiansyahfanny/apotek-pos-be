const express = require('express');
const router = express.Router();
const path = require('path');

// router.get('^/$|/index(.html)?', (req, res) => {
// 	res.send('API Apotik Pos');
// });
router.get('/', (req, res) => {
	res.send({ msg: 'API Apotik Pos' });
});

// router.get('/unauthorized', (req, res) => {
// 	res.send('unauthorized');
// });

module.exports = router;
