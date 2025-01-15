import express from 'express';
const router = express.Router();
import { bookAppointment, cancelAppointment, getAppointments } from '../controllers/appointmentController.js';

// Routes
router.post('/book', bookAppointment);
router.delete('/cancel/:id', cancelAppointment);
router.get('/', getAppointments);

export default router;  // Ensure default export
