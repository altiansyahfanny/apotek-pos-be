const express = require("express");
const { purchaseContoller } = require("../controllers/index");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const router = express.Router();

router.get("/", purchaseContoller.getAll);
router.get("/product/:id", paginationMiddleware, purchaseContoller.getPurchasesWithPaginationByProductId);

module.exports = router;
