const router = require("express").Router();
const Advisory = require("../models/Advisory");
const authMiddleware = require("../middleware/authMiddleware");

// Create advisory (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, description, severity, recommendedAction, crops } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ message: "Title, category, and description are required" });
    }
    const advisory = await Advisory.create({
      title,
      category,
      description,
      severity,
      recommendedAction,
      crops,
      createdBy: req.user.id
    });
    res.status(201).json(advisory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all advisories
router.get("/", async (req, res) => {
  try {
    const advisories = await Advisory.find({ isGlobal: true })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(advisories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get advisories by category
router.get("/category/:category", async (req, res) => {
  try {
    const advisories = await Advisory.find({ category: req.params.category, isGlobal: true })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(advisories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single advisory
router.get("/:id", async (req, res) => {
  try {
    const advisory = await Advisory.findById(req.params.id).populate("createdBy", "name");
    if (!advisory) return res.status(404).json({ message: "Advisory not found" });
    res.json(advisory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update advisory (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const advisory = await Advisory.findById(req.params.id);
    if (!advisory) return res.status(404).json({ message: "Advisory not found" });
    if (advisory.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Object.assign(advisory, req.body);
    advisory.updatedAt = Date.now();
    await advisory.save();
    res.json(advisory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete advisory (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const advisory = await Advisory.findById(req.params.id);
    if (!advisory) return res.status(404).json({ message: "Advisory not found" });
    if (advisory.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Advisory.findByIdAndDelete(req.params.id);
    res.json({ message: "Advisory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
