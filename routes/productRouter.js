const express = require("express");
const { productController } = require("../controllers/index");
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { create } = require("../validator/productValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const router = express.Router();

router.get("/", productController.getAll);
router.get("/pagination", paginationMiddleware, productController.getWithPagination);
router.get("/:id", productController.getById);
router.get("/purchases/:id", productController.getProductPurchasesWithPaginationById);

router.post("/", create, validatiorMiddleware, productController.create);
router.patch("/", validatiorMiddleware, productController.update);

module.exports = router;
