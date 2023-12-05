const adminController = {
  getAdminView: (req, res) => res.send("Pagina de admin"),
  getCreateView: (req, res) => res.send("Pagina de creacion de admins"),
  create: (req, res) => res.send("Ruta para confirmar la creacion de un admin"),
  getUpdateView: (req, res) => res.send(`Pagina de edicion de admin con ID: ${req.params.id}`),
  update: (req, res) => res.send(`Ruta para confirmar la edicion del admin con ID: ${req.params.id}`),
  delete: (req, res) => res.send(`Ruta para confirmar la eliminacion del admin con ID: ${req.params.id}`),
};

module.exports = adminController;