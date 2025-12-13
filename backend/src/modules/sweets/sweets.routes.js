const express = require("express");
const { createSweet,listSweets,searchSweets,
      updateSweet,deleteSweet,purchaseSweet} = require("./sweets.controller");
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

// Admin-only: delete sweet
router.delete("/:id", authenticate, authorizeAdmin, deleteSweet);

// Purchase a sweet (authenticated)
router.post("/:id/purchase", authenticate, purchaseSweet);

module.exports = router;
