const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.getAdminView);
router.get("/create", adminController.getCreateView);
router.post("/create", adminController.create);
router.get("/edit/:id", adminController.getUpdateView);
router.put("/edit/:id", adminController.update);
router.delete("/delete/:id", adminController.delete);

module.exports = router;