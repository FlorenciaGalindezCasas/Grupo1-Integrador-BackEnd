const fs = require("fs");
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const License = require('../models/license.model');
const Cart = require("../models/cart.model")

const shopController = {
  getShopView: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [License, Category],
      });

      return res.status(200).render("shop", {
        items: products,
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Product.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).render("item", {
        item,
      });
    } catch (error) {
      return res.status(500).send("Error");
    }
  },
  addItemToCart: async (req, res) => {
    try {
      const productID = +req.params.id;

      const cantidad = +req.body.cantidad;

      const product = await Product.findByPk(productID);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const compra = await Cart.create({
        product_id: productID,
        cantidad: cantidad,
        total: cantidad * product.price,
      });

      return res.status(201).json({
        compra,
        message: "Producto agregado con exito",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },
  getCartView: (req, res) => res.render("carrito"),
  confirmPurchase: (req, res) => res.render("carrito"),
};

module.exports = shopController;