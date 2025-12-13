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
 *  search for the list of sweets
 */
async function listSweets(req, res) {
      try {
        const sweets = await Sweet.find();
        return res.status(200).json(sweets);
      } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }


module.exports = {
  createSweet,listSweets
};
