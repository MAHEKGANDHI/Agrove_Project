const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  cropName: { type: String, required: true },
  variety: String,
  plantingDate: { type: Date, required: true },
  expectedHarvestDate: Date,
  actualHarvestDate: Date,
  area: { type: Number, required: true },
  expectedYield: Number,
  actualYield: Number,
  unit: { type: String, default: "kg" },
  season: String,
  status: { type: String, enum: ["planning", "growing", "harvested"], default: "growing" },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Crop", CropSchema);
