const express = require("express");
const router = express.Router();
const { permissionController } = require("../controllers/index");

router.get("/", permissionController.getAll);
router.get("/:id", permissionController.getPermissionModule);
router.patch("/:id", permissionController.update);

module.exports = router;
