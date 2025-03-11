const db = require("../db.js");

// Create an appointment
exports.createAppointment = async (appointmentData) => {
    const query = `
        INSERT INTO appointments (UserID, AppointmentDate, AppointmentTime, CustomerName, CustomerEmail, CustomerPhone, Notes, Status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        appointmentData.userID || null, // Allow NULL for non-registered users
        appointmentData.appointmentDate,
        appointmentData.appointmentTime,
        appointmentData.customerName,
        appointmentData.customerEmail,
        appointmentData.customerPhone,
        appointmentData.notes || null, // Set empty notes to NULL
        "Pending"
    ];
    
    return db.execute(query, values);
};

// Get all appointments
exports.getAppointments = async () => {
    const [appointments] = await db.execute("SELECT * FROM appointments");
    return appointments;
};

// Get appointment by ID
exports.getAppointmentById = async (id) => {
    const [appointment] = await db.execute("SELECT * FROM appointments WHERE AppointmentID = ?", [id]);
    return appointment.length ? appointment[0] : null;
};

// Update appointment status
exports.updateAppointmentStatus = async (id, status) => {
    return db.execute("UPDATE appointments SET Status = ? WHERE AppointmentID = ?", [status, id]);
};

// Delete an appointment
exports.deleteAppointment = async (id) => {
    return db.execute("DELETE FROM appointments WHERE AppointmentID = ?", [id]);
};
