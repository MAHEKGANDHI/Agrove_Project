const mongoose = require("mongoose");

const AdvisorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["weather", "pest", "disease", "fertilizer", "irrigation", "general"], required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  recommendedAction: String,
  crops: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isGlobal: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Advisory", AdvisorySchema);
