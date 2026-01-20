const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { 
    type: String, 
    enum: ["sowing", "irrigation", "fertilizing", "pesticide", "weeding", "harvesting", "other"],
    required: true
  },
  date: { type: Date, required: true },
  description: String,
  notes: String,
  status: { type: String, enum: ["pending", "completed"], default: "completed" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", ActivitySchema);
