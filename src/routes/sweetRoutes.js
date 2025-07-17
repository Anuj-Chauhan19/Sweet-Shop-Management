const express = require("express");
const router = express.Router();
const { addSweet, viewAllSweets,viewSweetById } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);
router.get("/", viewAllSweets);
router.get("/:id", viewSweetById); 

module.exports = router;
