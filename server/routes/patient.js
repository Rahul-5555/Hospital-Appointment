// routes/patient.js
import express from 'express';  
import { getPatients } from '../controllers/patientController.js'; 

const router = express.Router();

router.get('/', getPatients);

export default router;
