const express = require("express");
const router = express.Router();
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { doctorController } = require("../controllers/index");
const { create } = require("../validator/doctorValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

router.get("/", doctorController.getAll);
router.get("/pagination", paginationMiddleware, doctorController.getWithPagination);
router.post("/", create, validatiorMiddleware, doctorController.create);
router.patch("/", create, validatiorMiddleware, doctorController.update);

module.exports = router;
