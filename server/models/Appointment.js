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
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default model("Appointment", appointmentSchema);

