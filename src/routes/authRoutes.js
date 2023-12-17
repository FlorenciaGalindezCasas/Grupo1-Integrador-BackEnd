const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
	getLoginView,
	login,
	getRegisterView,
	register, 
	logout: logout,
} = require('../controllers/authController');
const { connection } = require('../config/connection');
const validation = require('../middlewares/validation');

const registerValidation = [
	body('email')
		.isEmail()
		.withMessage('Ingrese un email valido')
		.bail()
		.custom((value, {req}) => {
			// eslint-disable-next-line no-async-promise-executor
			return new Promise(async (resolve, reject) => {
				try {
					const [userAlreadyExists] = await connection.query(`SELECT * FROM user WHERE email = '${value}';`);
					if (userAlreadyExists[0]) {
						return reject();
					} else {
						return resolve();
					}
				} catch (error) {
					console.log(error);
				}
			});
		})
		.withMessage('El email ya se encuentra registrado'),
	body('password')
		.isStrongPassword( {
			minLength: 6,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0,
			pointsForContainingLower: 0,
			pointsForContainingNumber: 0,
			pointsForContainingSymbol: 0,
			pointsForContainingUpper: 0,
			pointsPerRepeat: 0,
			pointsPerUnique: 0,
			returnScore: 0
		})
		.withMessage('La contraseña debe tener un minimo de 6 caracteres, incluyendo una minuscula, una mayuscula y un numero')
		.custom((value, {req}) => value === req.body.confirmPassword)
		.withMessage('Las contraseñas no coinciden')
];

router.get('/login', getLoginView);
router.post('/login', login);
router.get('/register', getRegisterView);
router.post('/register', registerValidation, validation, register);
router.get('/logout', logout);

module.exports = router;