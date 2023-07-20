const express = require("express");
const { productUnitController } = require("../controllers/index");
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const router = express.Router();
const { create } = require("../validator/productUnitValidator");

router.get("/", productUnitController.getAll);
router.post("/", create, validatiorMiddleware, productUnitController.create);

module.exports = router;
