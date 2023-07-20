const { check } = require("express-validator");

const create = [
  check("name").trim().notEmpty().withMessage("Nama Racikan tidak boleh kosong"),
  check("product_unit_id").trim().notEmpty().withMessage("Satuan Produk tidak boleh kosong"),
  check("product_concoctions").custom((value) => {
    if (value.length < 1) throw new Error("Product harus memiliki setidaknya satu elemen.");
    return true;
  }),
  check("product_concoctions.*.qty").trim().notEmpty().withMessage("Qty tidak boleh kosong").isInt({ min: 1 }).withMessage("Qty tidak boleh kosong, minimal 1"),
];

module.exports = { create };
