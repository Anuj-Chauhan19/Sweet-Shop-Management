const express = require("express");
const router = express.Router();
const { addSweet, viewAllSweets, } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);
router.get("/", viewAllSweets);

module.exports = router;
