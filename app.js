const express = require("express");

const app = express();

const mainRoutes = require("./src/routes/mainRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js")
const adminRoutes = require("./src/routes/adminRoutes.js");
const shopRoutes = require("./src/routes/shopRoutes.js");

require("dotenv").config()

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", mainRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);
app.use("/", shopRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http:/localhost:${PORT}`);
});
