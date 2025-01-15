export async function getDoctors(req, res) {
  try {
    const doctors = await User.find({ role: "doctor" }); // Query users with the role 'doctor'
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
}

// controllers/userController.js
import User from "../models/User.js";


// controllers/userController.js

export async function registerDoctor(req, res) {
  const { name, email, password, specialty } = req.body;

  try {
    // Save doctor details in the Doctor collection
    const newDoctor = new Doctor({ name, email, password, specialty });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error registering doctor", error });
  }
}

