const { check } = require('express-validator');

const create = [check('name').trim().notEmpty().withMessage('Nama Supplier tidak boleh kosong')];

module.exports = { create };
