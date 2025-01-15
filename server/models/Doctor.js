// models/Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  role: { type: String, required: true }, // Add role if needed
});

const Doctor = mongoose.model('Doctor', doctorSchema);


export default Doctor;
