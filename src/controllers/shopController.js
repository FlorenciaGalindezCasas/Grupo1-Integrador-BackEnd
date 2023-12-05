const shopController = {
  getShopView: (req, res) => res.send("Pagina de Shop"),
  getItem: (req, res) => res.send(`Ruta para obtener el item de ID: ${req.params.id}`),
  addItemToCart: (req, res) => res.send(`Ruta para agregar el item de ID ${req.params.id} al carrito`),
  getCartView: (req, res) => res.send("Ruta para obtener la vista del carrito"),
  confirmPurchase: (req, res) => res.send("Ruta para confirmar la compra")
};

module.exports = shopController;