const express = require("express");
const path = require("path");
const sequelize = require('./src/config/sequelize.js');
const mainRoutes = require("./src/routes/mainRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js")
const adminRoutes = require("./src/routes/adminRoutes.js");
const shopRoutes = require("./src/routes/shopRoutes.js");
const User = require('./src/models/user.model.js');
const Product = require('./src/models/product.model.js');
const Cart = require("./src/models/cart.model.js")

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

require("dotenv").config();

sequelize
	.authenticate()
	.then(() => {
		console.log('Conexión establecida con la base de datos.');
	})
	.catch((err) => {
		console.error('Error al conectar con la base de datos:', err);
	});

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", mainRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http:/localhost:${PORT}`);
});
