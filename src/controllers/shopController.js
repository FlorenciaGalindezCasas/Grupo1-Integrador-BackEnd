const path = require("path");
const fs = require("fs");

const shopController = {
  getShopView: (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        return;
      }
    
      console.log('Contenido del archivo JSON:', data);
    
      try {
        const objetoJSON = JSON.parse(data);
        return res.render(path.resolve(__dirname, "../views/shop"), {
          items: objetoJSON
        })
        console.log('Objeto JSON:', objetoJSON);
      } catch (error) {
        console.error('Error al analizar el JSON:', error);
      }
    });
    /* return res.render(path.resolve(__dirname, "../views/shop"), {
      items: itemsParsed
    }); */
  },
  getItem: (req, res) => res.send(`Ruta para obtener el item de ID: ${req.params.id}`),
  addItemToCart: (req, res) => res.send(`Ruta para agregar el item de ID ${req.params.id} al carrito`),
  getCartView: (req, res) => res.send("Ruta para obtener la vista del carrito"),
  confirmPurchase: (req, res) => res.send("Ruta para confirmar la compra")
};

module.exports = shopController;