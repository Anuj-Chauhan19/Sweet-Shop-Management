const express = require("express");
const sweetRoutes = require("./routes/sweetRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sweets", sweetRoutes);
app.use(errorHandler);

module.exports = app;
