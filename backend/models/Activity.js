const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  farmId: mongoose.Schema.Types.ObjectId,
  type: String, // sowing, irrigation, harvest
  date: Date,
  notes: String
});

module.exports = mongoose.model("Activity", ActivitySchema);
