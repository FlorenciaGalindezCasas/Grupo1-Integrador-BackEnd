const express = require("express");
const router = express.Router();
const { 
    getLoginView,
    login,
    getRegisterView,
    register, 
    getLogoutView,
} = require("../controllers/authController");


router.get("/login", getLoginView);
router.post("/login", login);
router.get("/register", getRegisterView);
router.post("/register", register);
router.get("/logout", getLogoutView);

module.exports = router;