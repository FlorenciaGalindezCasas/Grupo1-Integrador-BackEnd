const adminController = {
  getAdminView: (req, res) => res.render("admin", { title: "Admin" }),
  getCreateView: (req, res) => res.render("create", { title: "Crear" }),
  create: async (req, res) => {},
  /* try {
      const newProduct = await Product.create(req.body);
      return res.status(201).json( newProduct );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal server error');
    } */

  getUpdateView: (req, res) =>
    res.render(`Pagina de edicion de admin con ID: ${req.params.id}`),
  update: (req, res) => res.render("edit", { title: "Editar" }),
  remove: (req, res) =>
    res.send(
      `Ruta para confirmar la eliminacion del admin con ID: ${req.params.id}`
    ),
};

module.exports = adminController;