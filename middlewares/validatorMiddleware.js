const { validationResult } = require('express-validator');

const validatiorMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ message: 'Validation error', errors: errors.array() });
	}
	next();
};

module.exports = validatiorMiddleware;
