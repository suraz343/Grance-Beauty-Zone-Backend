const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes properly
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes); // ✅ FIXED: Correct route declaration

// Default route for unknown endpoints (Prevents 404 for valid endpoints)
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
