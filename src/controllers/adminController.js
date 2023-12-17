const {
  getAll,
  getOne,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../models/product.model");

const adminController = {
  getAdminView: async (req, res) => {
    try {
      const result = await getAll();

      return res.status(200).render("admin", {
        items: result,
        title: "Admin",
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  getCreateView: (req, res) =>
    res.render("create", {
      title: "Create",
    }),
  create: async (req, res) => {
    try {
      const productObject = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        price: req.body.price,
        stock: req.body.stock,
        discount: req.body.discount,
        sku: req.body.sku,
        dues: req.body.dues,
        image_front: `/products/${req.files[0].filename}`,
        image_back: `/products/${req.files[1].filename}`,
        category_id: req.body.category_id,
        licence_id: req.body.licence_id,
      };

      const [item] = await createProduct(productObject);

      return res.status(200).render("item", {
        item,
        title: "Item",
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  getUpdateView: async (req, res) => {
    try {
      const { id } = req.params;
      const [item] = await getOne(+id);

      if (item.error) {
        throw new Error(result.message);
      }

      return res.status(200).render("edit", {
        item,
        title: "Item",
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const [item] = await editProduct(+id, req.body);

      console.log("Item: ", item);

      return res.status(200).render("item", {
        item,
        title: "Item",
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      await deleteProduct(+id);

      const itemsUpdated = await getAll();

      return res.status(200).render("admin", {
        items: itemsUpdated,
        title: "Admin",
      });
    } catch (error) {
      return res.status(500).send(`Server error: ${error}`);
    }
  },
};

module.exports = adminController;
