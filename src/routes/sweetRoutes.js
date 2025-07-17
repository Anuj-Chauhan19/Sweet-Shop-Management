const express = require("express");
const router = express.Router();
const { addSweet, viewAllSweets,viewSweetById, deleteSweetById, purchaseSweet } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);
router.get("/", viewAllSweets);
router.get("/:id", viewSweetById); 
router.delete("/:id", deleteSweetById);
router.post("/:id/purchase",purchaseSweet)

module.exports = router;
