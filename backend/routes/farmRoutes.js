const router = require("express").Router();
const Farm = require("../models/Farm");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// Create farm
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmName, crop, totalArea, soilType } = req.body;

    if (!farmName || !totalArea) {
      return res.status(400).json({
        message: "Farm name and total area are required",
      });
    }

    const farm = await Farm.create({
      farmName,
      crop,
      totalArea,
      soilType,
      userId: req.user.id,
    });

    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all farms for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single farm
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid farm ID" });
    }

    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    if (farm.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update farm
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid farm ID" });
    }

    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    if (farm.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(farm, req.body);
    await farm.save();

    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete farm
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid farm ID" });
    }

    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    if (farm.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await farm.deleteOne();
    res.json({ message: "Farm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
