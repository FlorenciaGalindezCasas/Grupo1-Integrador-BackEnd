const express = require("express")

const router = express.Router()

router.get("/admin", (req,res) => res.send("Pagina admin"))
router.get("/admin/create", (req, res) => res.send("Pagina admin"));
router.post("/admin/create", (req, res) => res.send("Pagina admin"));
router.get("/admin/edit/:id", (req, res) => res.send("Pagina admin"));
router.put("/admin/edit/:id", (req, res) => res.send("Pagina admin"));
router.delete("/admin/delete/:id", (req, res) => res.send("Pagina admin"));

module.exports = router;