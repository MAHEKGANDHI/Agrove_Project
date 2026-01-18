const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fieldName: String,
  area: Number,
  crop: String,
  soilType: String
});

module.exports = mongoose.model("Farm", FarmSchema);
