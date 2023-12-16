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
const upload = require('../middlewares/uploadFiles');

router.get("/", getAdminView);
router.get("/create", getCreateView);
router.post("/create", upload.array("image_front", 2), create);
router.get("/edit/:id", getUpdateView);
router.put("/edit/:id", upload.array("image_front", 2), update);
router.delete("/delete/:id", remove);

module.exports = router;