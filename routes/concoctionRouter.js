const express = require("express");
const { concoctionController } = require("../controllers/index");
const validatiorMiddleware = require("../middlewares/validatorMiddleware");
const router = express.Router();
const { create } = require("../validator/concoctionValidator");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

router.get("/", concoctionController.getAll);
router.get("/pagination", paginationMiddleware, concoctionController.getWithPagination);
router.post("/", create, validatiorMiddleware, concoctionController.create);
router.patch("/", create, validatiorMiddleware, concoctionController.update);
router.delete("/:id", concoctionController.destroy);

module.exports = router;
