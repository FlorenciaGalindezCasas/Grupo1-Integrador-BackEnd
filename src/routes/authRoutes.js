const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/login", authController.getLoginView);
router.post("/login", authController.login);
router.get("/register", authController.getRegisterView);
router.post("/register", authController.register);
router.get("/logout", authController.getLogoutView);

module.exports = router;