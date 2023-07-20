const { check } = require("express-validator");

const create = [check("name").trim().notEmpty().withMessage("Nama Satuan Produk tidak boleh kosong")];

module.exports = { create };
