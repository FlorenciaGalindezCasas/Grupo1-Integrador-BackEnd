const { getAll, getOne, createProduct, editProduct, deleteProduct } = require('../models/product.model');

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
  getCreateView: (req, res) => res.render("create", {
    title: "Create"
  }),
  create: async (req, res) => {
    try {
      const item = await createProduct(req.body);

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
      const item = await getOne(+id);

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

      const item = await editProduct(+id, req.body);

      return res.status(200).render("item", {
        item,
        title: "Item"
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  remove: async (req, res) => {
    try {
      const {id} = req.params;

      await deleteProduct(+id);

      const itemsUpdated = await getAll();

      return res.status(200).render("admin", {
        items: itemsUpdated,
        title: "Admin"
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
};

module.exports = adminController;