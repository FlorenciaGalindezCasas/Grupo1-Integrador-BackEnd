const express = require("express");
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get("/", shopController.getShopView);
router.get("/item/:id", shopController.getItem);
router.post("/item/:id/add", shopController.addItemToCart);
router.get("/cart", shopController.getCartView);
router.post("/cart", shopController.confirmPurchase);

module.exports = router;