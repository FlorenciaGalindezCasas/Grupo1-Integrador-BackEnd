const fs = require("fs");
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const License = require('../models/license.model');

const shopController = {
  getShopView: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: License
          },
          {
            model: Category
          }
        ]
      });

      return res.status(200).render("shop", {
        items: products
      });
    } catch (error) {
      return res.status(500).send({error})
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Product.findByPk(req.params.id)
      if (!item) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).render("item", {
      item 
    });      
    } catch (error) {
      return res.status(500).send("Error")
    }
  },
  addItemToCart: async (req, res) => {
    try {
      const productID = +req.params.id

      const cantidad = req.body
      
      const product = await Product.findByPk(productID)
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

       const compra = await Cart.create({
        product_id: productID,
        cantidad: cantidad,
        total: cantidad*product.price 
      })
      
      return res.status(201).json({
        compra,
        message: "Producto agregado con exito"
      })

    } catch (error) {
      
    }
  },
  getCartView: (req, res) => res.render("carrito"),
  confirmPurchase: (req, res) => res.send("Ruta para confirmar la compra")
};

module.exports = shopController;