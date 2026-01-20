const Farm = require("../models/Farm");

// ADD FARM
const addFarm = async (req, res) => {
  try {
    const { name, location, size } = req.body;

    if (!name || !location || !size) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const farm = await Farm.create({
      name,
      location,
      size,
      user: req.user.id,
    });

    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FARMS (user-specific)
const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user.id });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFarm, getFarms };
