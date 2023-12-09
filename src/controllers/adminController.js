const Product = require('../models/product.model');

const adminController = {
  getAdminView: (req, res) => res.send("Pagina de admin"),
  getCreateView: (req, res) => res.send("Pagina de creacion de admins"),
  create: async (req, res) => {
    const { 
      product_name,
      product_description,
      price,
      stock,
      discount,
      sku,
      dues,
      image_front,
      image_back,
      license_id,
      category_id
    } = req.body;

    const newProduct = await Product.create({
      product_name,
      product_description,
      price,
      stock,
      discount,
      sku,
      dues,
      image_front,
      image_back,
      license_id,
      category_id
    });
    return newProduct;
  },
  getUpdateView: (req, res) => res.send(`Pagina de edicion de admin con ID: ${req.params.id}`),
  update: (req, res) => res.send(`Ruta para confirmar la edicion del admin con ID: ${req.params.id}`),
  delete: (req, res) => res.send(`Ruta para confirmar la eliminacion del admin con ID: ${req.params.id}`),
};

module.exports = adminController;