const isLogged = (req, res, next) => {
	if (req.session.userId) {
		res.locals.isLogged = true;
	} else {
		if (req.originalUrl.startsWith('/admin')) {
			return res.status(401).redirect('/auth/login');
		}
		res.locals.isLogged = false;
	}
	next();
};

module.exports = { isLogged };
