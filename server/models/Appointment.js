// models/Appointment.js
import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor", // Assuming you have a Doctor model
    required: true,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    
  },
  from: {
    type: String, // Example: "10:00 AM"
    required: true,
  },
  to: {
    type: String, // Example: "11:00 AM"
    required: true,
  },
});

export default model("Appointment", appointmentSchema);
