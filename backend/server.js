const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// // 🔍 TEMP DEBUG (remove after testing)
// console.log("Mongo URI:", process.env.MONGO_URI);
// console.log("JWT Secret:", process.env.JWT_SECRET);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/farms", require("./routes/farmRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
