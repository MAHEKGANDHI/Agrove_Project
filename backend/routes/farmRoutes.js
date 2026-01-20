const router = require("express").Router();
const Farm = require("../models/Farm");
const authMiddleware = require("../middleware/authMiddleware");

// Create farm
router.post("/", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get farms
router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.json({ fields: farms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
