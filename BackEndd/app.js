const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://127.0.0.1:58019", "http://localhost:3000"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'none', // Allow cross-site requests
        secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
/*
// Apply security middleware
app.use(corsProtection); // Custom CORS protection
app.use(preventStateChangingGet); // Prevent state-changing GET requests
app.use(regenerateSession); // Regenerate session on login
app.use(csrfCheck); // CSRF protection
*/
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
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
