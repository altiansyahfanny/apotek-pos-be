const { check } = require("express-validator");

const create = [check("name").trim().notEmpty().withMessage("Nama Pelanggan tidak boleh kosong"), check("birth_date").trim().notEmpty().withMessage("Tanggal Lahir tidak boleh kosong")];

module.exports = { create };
