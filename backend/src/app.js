const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Sweet Shop API is running" });
});

module.exports = app;
