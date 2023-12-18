const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const mainRoutes = require('./src/routes/mainRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const shopRoutes = require('./src/routes/shopRoutes.js');
const { isLogged } = require('./src/middlewares/authorization.js');

const app = express();
const sessionStore = new MySQLStore({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,  
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10,  
	queueLimit: 0
});

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(session({
	secret: 's3cr3TS3ss1oN',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


require('dotenv').config();

const PORT = 3000;


app.use('/', mainRoutes);
app.use('/admin', isLogged, adminRoutes);
app.use('/auth', isLogged, authRoutes);
app.use('/shop', isLogged, shopRoutes);

app.listen(PORT, () => {
	console.log(`Listening at http:/localhost:${PORT}`);
});
