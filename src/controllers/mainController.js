const mainController = {
	home: (req, res) => res.render('main', { title: 'Home' }),
	contact: (req, res) => res.send('Pagina de Contacto'),
	about: (req, res) => res.send('Pagina About us'),
	faqs: (req, res) => res.send('Pagina de faqs'),
};

module.exports = mainController;
