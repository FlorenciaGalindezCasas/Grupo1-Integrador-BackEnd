const { createUser, verifyUser } = require('../models/user.model');
const bcrypt = require('bcrypt');

const authController = {
	getLoginView: (req, res) => res.render('login', { title: 'Login' }),
	login: async (req, res) => {
		const {email, password} = req.body;

		const [validatedUser] = await verifyUser(email, password);
    
		if (validatedUser === undefined) {
			return res.status(404).json({ error: 'El usuario no se encuentra registrado'});
		} else if (!(await bcrypt.compare(password, validatedUser.password))) {
			return res.status(404).json({ error: 'Contraseña incorrecta' });
		} else {
			req.session.userId = validatedUser.user_id;
			return res.status(200).redirect('/admin');
		}
	},
	getRegisterView: (req, res) => res.render('register', { title: 'Register' }),
	register: async (req, res) => {
		const userToCreate = {
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		};

		await createUser(userToCreate);
    
		return res.status(200).redirect('login');
	},
	logout: (req, res) => {
		req.session.userId = null;

		return res.redirect('login');
	},
};

module.exports = authController;