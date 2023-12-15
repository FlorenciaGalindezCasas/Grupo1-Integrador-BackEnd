const isLogged = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).redirect('/auth/login');
  }

  next();
}

module.exports = { isLogged };