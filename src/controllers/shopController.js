const fs = require("fs");

function reedJsonFile(callback) {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) throw new Error('Error al leer el archivo JSON:', err);

    try {
      const objetoJSON = JSON.parse(data);
      console.log('Contenido del archivo JSON:', objetoJSON);
      callback(null, objetoJSON);
    } catch (error) {
      throw new Error('Error al analizar el JSON:', error);
    }
  });
}

const shopController = {
  getShopView: (req, res) => {
    reedJsonFile((err, result) => {
      return res.render("shop", {
        items: result
      })
    })
  },
  getItem: (req, res) => {
    reedJsonFile((err, result) => {
      const item = result.find(i => i.product_id === +req.params.id);
      return res.render("item", {
        item
      });
    })
  },
  addItemToCart: (req, res) => res.send(`Ruta para agregar el item de ID ${req.params.id} al carrito`),
  getCartView: (req, res) => res.render("carrito"),
  confirmPurchase: (req, res) => res.send("Ruta para confirmar la compra")
};

module.exports = shopController;