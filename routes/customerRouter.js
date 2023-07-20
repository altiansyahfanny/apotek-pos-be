const express = require("express");
const router = express.Router();
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { customerController } = require("../controllers/index");
const { create } = require("../validator/customerValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

router.get("/", customerController.getAll);
router.get("/pagination", paginationMiddleware, customerController.getWithPagination);
router.post("/", create, validatiorMiddleware, customerController.create);
router.patch("/", create, validatiorMiddleware, customerController.update);

module.exports = router;
