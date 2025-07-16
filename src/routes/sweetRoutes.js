const express = require("express");
const router = express.Router();
const { addSweet } = require("../controllers/sweetController.mongo");

router.post("/", addSweet);

module.exports = router;
