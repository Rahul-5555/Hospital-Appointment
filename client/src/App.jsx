import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import DoctorList from './components/DoctorList';
import PatientList from './components/PatientList';

function App() {
  return (
    <div>
      <h1 className="bg-red-500 text-white text-4xl font-bold py-4 px-6 rounded-t-lg shadow-md text-center">
        Hospital Management
      </h1>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
