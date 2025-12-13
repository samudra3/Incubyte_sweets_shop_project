const express = require("express");
const User = require("./user.model");
const bcrypt= require('bcrypt');
const router = express.Router();



router.post("/register", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
          name,
          email,
          password: hashedPassword
        });

        return res.status(201).json({
          message: "User registered successfully"
        });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    module.exports = router;
