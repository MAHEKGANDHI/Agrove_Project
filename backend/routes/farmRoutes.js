const router = require("express").Router();
const Farm = require("../models/Farm");
const authMiddleware = require("../middleware/authMiddleware");

// Create farm
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmName, location, totalArea, soilType } = req.body;
    if (!farmName || !totalArea) {
      return res.status(400).json({ message: "Farm name and total area are required" });
    }
    const farm = await Farm.create({
      farmName,
      location,
      totalArea,
      soilType,
      userId: req.user.id,
    });
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all farms for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id }).populate("userId", "name email");
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single farm
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id).populate("userId", "name email");
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    if (farm.userId._id.toString() !== req.user.id) {
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
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    if (farm.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Object.assign(farm, req.body);
    farm.updatedAt = Date.now();
    await farm.save();
    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete farm
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    if (farm.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Farm.findByIdAndDelete(req.params.id);
    res.json({ message: "Farm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
