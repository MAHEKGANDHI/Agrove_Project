const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------- CORS ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://agrove-project-weld.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/farms", require("./routes/farmRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/advisories", require("./routes/advisoryRoutes"));

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo error:", err));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
