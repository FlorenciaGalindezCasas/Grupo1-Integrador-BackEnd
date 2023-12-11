const express = require("express");
const router = express.Router();

const {home, contact, about, faqs} = require("../controllers/mainController.js");

router.get("/", home);
router.get("/contact", contact);
router.get("/about", about);
router.get("/faqs", faqs);

module.exports = router;
