import Appointment from "../models/Appointment.js";

export async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find({})
      .populate("doctorId", "username"); // Populate doctorId with username
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to load appointments" });
  }
}

export async function bookAppointment(req, res) {
  const { doctorId, appointmentDate, from, to } = req.body;
  const newAppointment = new Appointment({ doctorId, appointmentDate, from, to });
  await newAppointment.save();
  res.status(201).json(newAppointment);
}

export async function cancelAppointment(req, res) {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment canceled" });
}
