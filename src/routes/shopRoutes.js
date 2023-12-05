const express = require("express")

const router = express.Router()

router.get("/shop", (req, res) => res.send("Pagina de Shop"));
router.get("/shop/item/:id", (req, res) => {const id = req.params.id});
router.post("/shop/item/:id/add", (req, res) => res.send("Pagina de Shop"));
router.get("/shop/cart", (req, res) => res.send("Pagina de Shop"));
router.post("/shop/cart", (req, res) => res.send("Pagina de Shop"));

module.exports = router;