const express = require("express");
const { createSweet,listSweets} = require("./sweets.controller");
const {
  authenticate,
  authorizeAdmin
} = require("../../middlewares/auth.middleware");

const router = express.Router();

// Admin-only: add sweet
router.post("/", authenticate, authorizeAdmin, createSweet);

// search route for the sweet
router.get("/", authenticate, listSweets);

module.exports = router;
