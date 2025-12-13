const express = require("express");
const { createSweet,listSweets,searchSweets} = require("./sweets.controller");
const {
  authenticate,
  authorizeAdmin
} = require("../../middlewares/auth.middleware");

const router = express.Router();

// Admin-only: add sweet
router.post("/", authenticate, authorizeAdmin, createSweet);

// get route for the sweet
router.get("/", authenticate, listSweets);

//search route for the sweet
router.get("/search", authenticate, searchSweets);

// Admin-only: update sweet
router.put("/:id", authenticate, authorizeAdmin, updateSweet);
module.exports = router;
