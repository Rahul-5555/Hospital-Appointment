// Corrected code

export async function getAppointments(req, res) {
  const appointments = await find();  // Assuming `find()` is a method from your Appointment model
  res.json(appointments);
}

export async function bookAppointment(req, res) {
  const { doctorId, appointmentDate } = req.body;
  const newAppointment = new Appointment({ doctorId, appointmentDate });
  await newAppointment.save();
  res.status(201).json(newAppointment);
}

export async function cancelAppointment(req, res) {
  const appointment = await findByIdAndDelete(req.params.id);  // Assuming this is a method from your Appointment model
  res.json({ message: 'Appointment canceled' });
}
