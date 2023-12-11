const Product = require('../models/product.model');

const adminController = {
  getAdminView: (req, res) => res.send("Pagina de admin"),
  getCreateView: (req, res) => res.send("Pagina de creacion de admins"),
  create: async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      return res.status(201).json( newProduct );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal server error');
    }
  },
  getUpdateView: (req, res) => res.send(`Pagina de edicion de admin con ID: ${req.params.id}`),
  update: (req, res) => res.send(`Ruta para confirmar la edicion del admin con ID: ${req.params.id}`),
  delete: (req, res) => res.send(`Ruta para confirmar la eliminacion del admin con ID: ${req.params.id}`),
};

module.exports = adminController;