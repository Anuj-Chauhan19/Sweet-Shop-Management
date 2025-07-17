const express = require("express");
const router = express.Router();
const { addSweet, viewAllSweets,viewSweetById, deleteSweetById, purchaseSweet, restockSweet } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);
router.get("/", viewAllSweets);
router.get("/:id", viewSweetById); 
router.delete("/:id", deleteSweetById);
router.post("/:id/purchase",purchaseSweet);
router.post("/:id/restock", restockSweet);

module.exports = router;
