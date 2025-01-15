import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'], // Ensure only 'patient' or 'doctor' are valid roles
    required: true,
  },
}, {
  timestamps: true,
});

export default model('User', userSchema);
