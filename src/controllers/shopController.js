const { getAll, getOne } = require('../models/product.model');

const shopController = {
  getShopView: async (req, res) => {
    const result = await getAll();

    if (result.error) {
      return res.status(400).json({ error: result.message });
    }
    
    return res.status(200).render("shop", {
      items: result,
      title: "Shop"
    })
  },
  getItem: async (req, res) => {
    const {id} = req.params;
    const [item] = await getOne(+id);

    if (item === undefined) {
      return res.status(404).json({ error: `No se encontró el producto con ID: ${id}`});
    }

    if (item.error) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(200).render("item", {
      item,
      title: "Item"
    })
  },
  addItemToCart: async (req, res) => res.send('Se agregó el producto al carrito!'),
  getCartView: (req, res) => res.render("carrito", {
    title: "Cart"
  }),
  confirmPurchase: (req, res) => res.send("Se confirmo la compra!")
};

module.exports = shopController;