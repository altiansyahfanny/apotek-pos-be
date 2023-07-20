const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index");

router.get("/permission", authController.getPermissions);
router.get("/refresh", authController.refresh);
router.post("/", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
