const { check } = require("express-validator");

const create = [
  check("date").trim().notEmpty().withMessage("Tanggal tidak boleh kosong"),
  check("code").trim().notEmpty().withMessage("Kode tidak boleh kosong"),
  check("warehouse_id").trim().notEmpty().withMessage("Gudang tidak boleh kosong"),
  check("customer_id").trim().notEmpty().withMessage("Pelanggan tidak boleh kosong"),
  check("doctor_id").trim().notEmpty().withMessage("Dokter tidak boleh kosong"),
  check("prescription_details.*.content").trim().notEmpty().withMessage("Resep tidak boleh kosong"),
];

module.exports = { create };
