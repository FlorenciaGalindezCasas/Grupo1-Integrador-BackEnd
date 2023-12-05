const express = require("express");

const router = express.Router();

router.get("/auth/login", (req, res) => res.send("Pagina auth"));
router.post("/auth/login", (req, res) => res.send("Pagina login"));
router.get("/auth/register", (req, res) => res.send("Pagina register"));
router.post("/auth/register", (req, res) => res.send("Pagina auth register"));
router.get("/auth/logout", (req, res) => res.send("Pagina logout"));

module.exports = router;