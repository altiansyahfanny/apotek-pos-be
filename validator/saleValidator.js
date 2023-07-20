const { check } = require("express-validator");

const create = [
  check("date").trim().notEmpty(),
  check("due_date").custom((value, { req }) => {
    const status = req.body.status;
    if (status === 2) {
      if (value === "" || value === null || !value) {
        throw new Error("Jatuh tempo tidak boleh kosong");
      }
    }
    return true;
  }),
  check("products.*.product_stock_id").notEmpty(),
  check("products.*.qty").trim().notEmpty().isInt({ min: 1 }),
  check("products.*.price_type").trim().notEmpty(),
  check("products.*.price").trim().notEmpty().isInt({ min: 1 }),
  //   check("products.*.qty").trim().notEmpty().isInt({ min: 1 }),
];

module.exports = { create };
