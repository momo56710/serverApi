const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;

// Root route handler — works without a router
connectDB(); // Connect to MongoDB

// Middleware to parse JSON
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/posts", require("./routes/postsRoutes")); // Use posts routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});