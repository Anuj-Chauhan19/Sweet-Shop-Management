const express = require("express");
const sweetRoutes = require("./routes/sweetRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/api/sweets", sweetRoutes);
app.use(errorHandler);

module.exports = app;
