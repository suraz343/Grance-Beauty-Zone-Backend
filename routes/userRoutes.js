const express = require("express");
const router = express.Router();
const db = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register & Auto Login
router.post("/register", async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO Users (Name, Email, Phone, PasswordHash) VALUES (?, ?, ?, ?)";
    
    db.query(query, [name, email, phone, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Generate JWT Token for auto login
        const token = jwt.sign({ userID: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ 
            message: "User Registered & Logged in Successfully", 
            token,  
            UserID: result.insertId 
        });
    });
});

// Login API
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM Users WHERE Email = ?";

    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ userID: user.UserID, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, userID: user.UserID });
    });
});

module.exports = router;
