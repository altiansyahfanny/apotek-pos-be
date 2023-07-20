const express = require("express");
const router = express.Router();
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const { userController } = require("../controllers/index");
const { create } = require("../validator/doctorValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

router.get("/", userController.getAll);
router.get("/pagination", paginationMiddleware, userController.getWithPagination);
router.post("/", create, validatiorMiddleware, userController.create);
router.patch("/", create, validatiorMiddleware, userController.update);

module.exports = router;
