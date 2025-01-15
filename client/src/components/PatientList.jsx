import React, { useState, useEffect } from 'react';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients');  // Backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the fetched data

        if (Array.isArray(data)) {
          setPatients(data);  // Set patients if the data is an array
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error:', error);  // Log error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);  // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Patient List</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
        {patients.map(patient => (
          <div key={patient._id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700">
              {patient.name ? patient.name : 'Unknown Name'} - Age: {patient.age || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
