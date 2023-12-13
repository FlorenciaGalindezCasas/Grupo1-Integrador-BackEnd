const express = require("express");
const router = express.Router();
const {
  getAdminView,
  getCreateView,
  create,
  getUpdateView,
  update,
  remove
} = require("../controllers/adminController");

router.get("/", getAdminView);
router.get("/create", getCreateView);
router.post("/create", create);
router.get("/edit/:id", getUpdateView);
router.get("/edit", update);
router.delete("/delete/:id", remove);

module.exports = router;