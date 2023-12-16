const { getAll, getOne } = require('../models/product.model');

const shopController = {
  getShopView: async (req, res) => {
    try {
      const result = await getAll();

      console.log(result[0]);

      if (result.error) {
        throw new Error (result.message);
      }
      
      return res.status(200).render("shop", {
        items: result,
        title: "Shop"
      })
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`)
    }
  },
  getItem: async (req, res) => {
    try {
      const {id} = req.params;
      const [item] = await getOne(+id);

      if (item.error) {
        throw new Error (result.message);
      }

      return res.status(200).render("item", {
        item,
        title: "Item"
      })
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  addItemToCart: async (req, res) => res.send('Se agregó el producto al carrito!'),
  getCartView: (req, res) => res.render("carrito", {
    title: "Cart"
  }),
  confirmPurchase: (req, res) => res.render("Se confirmo la compra!")
};

module.exports = shopController;