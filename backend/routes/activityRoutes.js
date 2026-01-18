const router = require("express").Router();
const Activity = require("../models/Activity");

router.post("/", async (req, res) => {
  const activity = await Activity.create(req.body);
  res.json(activity);
});

router.get("/:farmId", async (req, res) => {
  const activities = await Activity.find({ farmId: req.params.farmId });
  res.json(activities);
});

module.exports = router;
