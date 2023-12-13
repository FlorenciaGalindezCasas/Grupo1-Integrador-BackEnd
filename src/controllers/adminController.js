const { getAll, createProduct, editProduct } = require('../models/product.model');

const adminController = {
  
  getAdminView: async (req, res) => {
    try {
      const result = await getAll();
      
      return res.status(200).render("admin", {
        items: result,
        title: "Admin"
      })
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  getCreateView: (req, res) => res.render("create"),
  create: async (req, res) => {
    try {
      const [item] = await createProduct(req.body);

      return res.status(200).render("item", {
        item,
        title: "Item"
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  getUpdateView: async (req, res) => {
    try {
      const {id} = req.params;
      const [item] = await getOne(+id);

      if (item.error) {
        throw new Error (result.message);
      }

      return res.status(200).render("edit", {
        item,
        title: "Item"
      })
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const {id} = req.params;

      const [item] = await editProduct(+id, req.body);

      return res.status(200).json({item})
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  remove: (req, res) => res.send(`Ruta para confirmar la eliminacion del admin con ID: ${req.params.id}`),
};

module.exports = adminController;