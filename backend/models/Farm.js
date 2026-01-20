const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmName: { type: String, required: true },
  location: String,
  totalArea: { type: Number, required: true },
  soilType: String,
  fields: [{
    fieldId: mongoose.Schema.Types.ObjectId,
    fieldName: String,
    area: Number,
    crop: String,
    plantingDate: Date,
    expectedHarvestDate: Date,
    yield: Number
  }],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Farm", FarmSchema);
