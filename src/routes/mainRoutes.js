const express = require("express");
const router = express.Router();
const {isLogged } = require("../middlewares/authorization.js")

const {home, contact, about, faqs} = require("../controllers/mainController.js");

router.get("/", isLogged, home);
router.get("/contact", contact);
router.get("/about", about);
router.get("/faqs", faqs);

module.exports = router;
