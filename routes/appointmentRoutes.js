const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Create a new appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getAppointments);

// Get a specific appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

// Update appointment status
router.patch("/:id", appointmentController.updateAppointmentStatus);

// Delete an appointment
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
