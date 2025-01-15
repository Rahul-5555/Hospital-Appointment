import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      } else {
        setError("Failed to load appointments");
      }
    } catch (error) {
      setError("An error occurred while fetching appointments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Your Appointments
        </h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && appointments.length === 0 && (
          <p className="text-center text-gray-600">No appointments scheduled.</p>
        )}

        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-gray-100 p-4 rounded-md mb-4"
          >
            <p className="text-lg font-medium text-gray-800">
              Dr. {appointment.doctorId.username}
            </p>
            <p className="text-sm text-gray-600">{appointment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
