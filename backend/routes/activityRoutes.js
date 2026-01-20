const router = require("express").Router();
const Activity = require("../models/Activity");
const authMiddleware = require("../middleware/authMiddleware");

// Create activity
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmId, type, date, description, notes } = req.body;
    if (!farmId || !type || !date) {
      return res.status(400).json({ message: "Farm ID, type, and date are required" });
    }
    const activity = await Activity.create({
      farmId,
      userId: req.user.id,
      type,
      date,
      description,
      notes
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get activities by farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ farmId: req.params.farmId })
      .populate("userId", "name")
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all user activities
router.get("/", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id })
      .populate("farmId", "farmName")
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update activity
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    if (activity.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { type, date, description, notes, status } = req.body;
    if (type !== undefined) activity.type = type;
    if (date !== undefined) activity.date = date;
    if (description !== undefined) activity.description = description;
    if (notes !== undefined) activity.notes = notes;
    if (status !== undefined) activity.status = status;
    activity.updatedAt = Date.now();
    await activity.save();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete activity
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    if (activity.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
