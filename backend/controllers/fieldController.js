const Farm = require("../models/Farm");

const createField = async (req, res) => {
  try {
    const { name, area, mainCrop, soil } = req.body;

    if (!name || !area || !mainCrop || !soil) {
      return res.status(400).json({
        message: "All field details are required"
      });
    }

    const field = await Farm.create({
      farmName: name,
      totalArea: area,
      soilType: soil,
      userId: req.user.id
    });

    res.status(201).json(field);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createField };
