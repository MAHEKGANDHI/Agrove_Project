const router = require("express").Router();
const Farm = require("../models/Farm");

router.post("/", async (req, res) => {
  const farm = await Farm.create(req.body);
  res.json(farm);
});

router.get("/", async (req, res) => {
  const farms = await Farm.find();
  res.json(farms);
});

module.exports = router;
