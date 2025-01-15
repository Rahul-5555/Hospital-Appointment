import React, { useState, useEffect } from 'react';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([
    { name: 'Dr. John Doe', specialty: 'Cardiology', role: 'cardiologist' },
    { name: 'Dr. Jane Smith', specialty: 'Neurology', role: 'neurologist' },
    { name: 'Dr. Emily Johnson', specialty: 'Pediatrics', role: 'pediatrician' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        const data = await response.json();

        if (response.ok) {
          setDoctors(data);  // Update the state with the list of doctors
        } else {
          setError('Failed to load doctors');
        }
      } catch (error) {
        setError('An error occurred while fetching doctors');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);  // Empty dependency array to run the effect only once on mount

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Doctors List</h2>

        {loading && <p className="text-center text-gray-600">Loading doctors...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {doctors.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No doctors available.</p>
        )}

        {doctors.map(doctor => (
          <div key={doctor._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-lg font-medium text-gray-800">{doctor.name}</p>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
