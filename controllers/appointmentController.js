const appointmentModel = require("../models/appointmentModel");

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        let { userID, appointmentDate, appointmentTime, customerName, customerEmail, customerPhone, notes, status } = req.body;

        // Ensure userID is explicitly set to null if not provided
        userID = userID || null;

        // Ensure status has a default value
        status = status || "Pending";

        // Validate required fields
        if (!appointmentDate || !appointmentTime || !customerName || !customerEmail || !customerPhone) {
            return res.status(400).json({ error: "All required fields must be provided!" });
        }

        // Insert into the database
        const result = await appointmentModel.createAppointment({
            userID,
            appointmentDate,
            appointmentTime,
            customerName,
            customerEmail,
            customerPhone,
            notes: notes || null, // Convert undefined notes to null
            status
        });

        res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.getAppointments();
        console.log("Fetched Appointments:", appointments);
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Fetch Appointments Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching Appointment ID:", id);
        const appointment = await appointmentModel.getAppointmentById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found!" });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error("Fetch Appointment Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log("Updating Status for Appointment ID:", id, "New Status:", status);

        const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value!" });
        }

        await appointmentModel.updateAppointmentStatus(id, status);
        res.status(200).json({ message: "Appointment status updated!" });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting Appointment ID:", id);
        await appointmentModel.deleteAppointment(id);
        res.status(200).json({ message: "Appointment deleted successfully!" });
    } catch (error) {
        console.error("Delete Appointment Error:", error);
        res.status(500).json({ error: error.message });
    }
};
