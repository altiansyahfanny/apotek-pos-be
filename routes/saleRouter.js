const express = require("express");
const router = express.Router();
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { saleController } = require("../controllers/index");
const { create } = require("../validator/saleValidator");

router.get("/", saleController.getAll);
router.get("/pending", saleController.getPendingSale);
router.get("/:id", saleController.getById);

router.post("/", create, validatiorMiddleware, saleController.create);
router.patch("/pending", create, validatiorMiddleware, saleController.updatePendingSale);
router.delete("/pending/:id", saleController.deletePendingSale);
router.delete("/:id", saleController.deleteSale);

module.exports = router;
