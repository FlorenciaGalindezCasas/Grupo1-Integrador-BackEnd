const express = require("express");
const router = express.Router();
const {
  getShopView,
  getItem,
  addItemToCart,
  getCartView,
  confirmPurchase
} = require('../controllers/shopController');

router.get("/", getShopView);
router.get("/item/:id", getItem);
router.post("/item/:id/add", addItemToCart);
router.get("/cart", getCartView);
router.post("/cart", confirmPurchase);

module.exports = router;