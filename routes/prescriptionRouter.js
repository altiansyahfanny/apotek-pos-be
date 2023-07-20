const express = require("express");
const { prescriptionController } = require("../controllers/index");
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { create } = require("../validator/prescriptionValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const router = express.Router();

router.get("/", prescriptionController.getAll);
router.get("/pagination", paginationMiddleware, prescriptionController.getWithPagination);
router.get("/:id", prescriptionController.getById);
router.post("/", create, validatiorMiddleware, prescriptionController.create);
router.patch("/", create, validatiorMiddleware, prescriptionController.update);
router.delete("/:id", prescriptionController.destroy);

module.exports = router;
