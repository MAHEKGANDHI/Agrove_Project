const router = require("express").Router();
const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/authMiddleware");

// Create crop
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmId, cropName, plantingDate, area } = req.body;
    if (!farmId || !cropName || !plantingDate || !area) {
      return res.status(400).json({ message: "Farm ID, crop name, planting date, and area are required" });
    }
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get crops by farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const crops = await Crop.find({ farmId: req.params.farmId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single crop
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update crop
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete crop
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
