import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';  // Use import syntax
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;  // Export router as default
