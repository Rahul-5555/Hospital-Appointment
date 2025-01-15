// controllers/patientController.js
import User from '../models/User.js';  // Import User model

export const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' });  // Fetch all patients from the User collection
    res.json(patients);  // Return the patients as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};
