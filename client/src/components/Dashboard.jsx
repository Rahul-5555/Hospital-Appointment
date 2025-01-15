import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Welcome to the Dashboard</h2>

        <div className="space-y-4">
          <Link
            to="/appointments"
            className="block py-3 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Manage Appointments
          </Link>

          <Link
            to="/doctors"
            className="block py-3 text-center bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            View Doctors
          </Link>

          <Link
            to="/patients"
            className="block py-3 text-center bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          >
            View Patients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
