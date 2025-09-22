const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
