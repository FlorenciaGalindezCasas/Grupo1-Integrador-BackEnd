const authController = {
  getLoginView: (req, res) => res.send("Pagina de login"),
  login: (req, res) => res.send("Ruta para loguearse"),
  getRegisterView: (req, res) => res.send("Pagina para registrarse"),
  register: (req, res) => res.send("Ruta para confirmar el registro"),
  getLogoutView: (req, res) => res.send("Pagina para cerrar sesion?")
};

module.exports = authController;