const express = require("express");
const mainController = require("../controllers/mainController.js");

const router = express.Router();

router.get("/home", mainController.home);
router.get("/contact", mainController.contact);
router.get("/about", mainController.about);
router.get("/faqs", mainController.faqs);

module.exports = router;
