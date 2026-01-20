const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    farmName: { type: String, required: true },
    location: String,
    crop: String,
    totalArea: { type: Number, required: true },
    soilType: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
