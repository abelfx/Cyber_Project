const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://127.0.0.1:49865",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Database connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/inventory_db",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use("/api", authRoutes);
app.use("/api", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
