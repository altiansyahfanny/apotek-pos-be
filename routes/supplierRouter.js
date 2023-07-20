const express = require("express");
const router = express.Router();
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { supplierController } = require("../controllers/index");
const { create } = require("../validator/supplierValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

router.get("/", supplierController.getAll);
router.get("/pagination", paginationMiddleware, supplierController.getWithPagination);
router.post("/", create, validatiorMiddleware, supplierController.create);
router.patch("/", create, validatiorMiddleware, supplierController.update);

module.exports = router;
