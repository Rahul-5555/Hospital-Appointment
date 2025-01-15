// Corrected code

import Appointment from "../models/Appointment.js";

export async function getAppointments(req, res) {
  const appointments = await Appointment.find({}).populate("doctorId");  // Assuming `find()` is a method from your Appointment model
  res.json(appointments);
}

export async function bookAppointment(req, res) {
  const { doctorId, appointmentDate, from, to } = req.body;
  const newAppointment = new Appointment({ doctorId, appointmentDate, from, to });
  await newAppointment.save();
  res.status(201).json(newAppointment);
}

export async function cancelAppointment(req, res) {
  await Appointment.findByIdAndDelete(req.params.id);  // Assuming this is a method from your Appointment model
  res.json({ message: 'Appointment canceled' });
}