const express = require("express");
const { productSalesController } = require("../controllers/index");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const router = express.Router();

router.get("/product/:id", paginationMiddleware, productSalesController.getProductSalesWithPaginationByProductId);

module.exports = router;
