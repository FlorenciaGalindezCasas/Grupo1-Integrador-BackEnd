const express = require("express");
const path = require("path");
const mainRoutes = require("./src/routes/mainRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js")
const adminRoutes = require("./src/routes/adminRoutes.js");
const shopRoutes = require("./src/routes/shopRoutes.js");

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

require("dotenv").config()

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
