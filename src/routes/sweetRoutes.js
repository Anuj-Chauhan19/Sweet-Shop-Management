const express = require("express");
const router = express.Router();
const { addSweet, viewAllSweets,viewSweetById, deleteSweetById } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);
router.get("/", viewAllSweets);
router.get("/:id", viewSweetById); 
router.delete("/:id", deleteSweetById);

module.exports = router;
