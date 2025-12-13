const Sweet = require("./sweet.model");

/**
 * Admin-only: Add a new sweet to inventory
 */
async function createSweet(req, res) {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    return res.status(201).json(sweet);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
/**
 *  Get all the list of sweets
 */
async function listSweets(req, res) {
      try {
        const sweets = await Sweet.find();
        return res.status(200).json(sweets);
      } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }

/**
 *  search all the list of sweets
 */

    async function searchSweets(req, res) {
      try {
        const { name, category, minPrice, maxPrice } = req.query;

        const query = {};

        if (name) {
          query.name = { $regex: name, $options: "i" };
        }

        if (category) {
          query.category = category;
        }

        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const sweets = await Sweet.find(query);
        return res.status(200).json(sweets);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }

    /**
 * Update sweet details (Admin-only)
 */
async function updateSweet(req, res) {
      try {
        const { id } = req.params;
        const { name, category, price, quantity } = req.body;

        const sweet = await Sweet.findByIdAndUpdate(
          id,
          { name, category, price, quantity },
          { new: true, runValidators: true }
        );

        if (!sweet) {
          return res.status(404).json({ message: "Sweet not found" });
        }

        return res.status(200).json(sweet);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }

    /**
 * Delete a sweet (Admin-only)
 */
async function deleteSweet(req, res) {
      try {
        const { id } = req.params;

        const sweet = await Sweet.findByIdAndDelete(id);

        if (!sweet) {
          return res.status(404).json({ message: "Sweet not found" });
        }

        return res.status(200).json({ message: "Sweet deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }

module.exports = {
  createSweet,listSweets,searchSweets,updateSweet,deleteSweet
};
