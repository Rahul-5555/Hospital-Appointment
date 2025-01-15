import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from API
    setAppointments([
      { id: 1, doctor: 'Dr. Smith', date: '2025-01-16', time: '10:00 AM' },
      { id: 2, doctor: 'Dr. Lee', date: '2025-01-17', time: '2:00 PM' }
    ]);
  }, []);

  const cancelAppointment = (id) => {
    // Call API to cancel appointment
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Your Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments scheduled.</p>
        ) : (
          appointments.map(appointment => (
            <div key={appointment.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4">
              <div>
                <p className="text-lg font-medium text-gray-800">{appointment.doctor}</p>
                <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
              </div>
              <button
                onClick={() => cancelAppointment(appointment.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
