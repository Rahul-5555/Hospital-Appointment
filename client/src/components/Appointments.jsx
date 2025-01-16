import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Appointments
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

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      if (response.ok) {
        setDoctors(data);
      } else {
        setError("Failed to load doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Handle Booking
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          date: appointmentDate,
          from: timeSlot.split("-")[0], // Start time
          to: timeSlot.split("-")[1], // End time
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments((prev) => [...prev, data]); // Update appointment list
        setIsModalOpen(false); // Close modal on success
      } else {
        alert("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Your Appointments
        </h2>

        {/* Loading/Error Messages */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && appointments.length === 0 && (
          <p className="text-center text-gray-600">No appointments scheduled.</p>
        )}

        {/* Appointment List */}
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-lg font-medium text-gray-800">
              {appointment.doctorId && appointment.doctorId.username
                ? `Dr. ${appointment.doctorId.username}`
                : "Doctor not available"}
            </p>
            <p className="text-sm text-gray-600">
              {new Date(appointment.date).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Book Appointment Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-6"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          Book Appointment
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Book Appointment
            </h3>
            <form onSubmit={handleBookAppointment}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Doctor</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Appointment Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded p-2"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Time Slot</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="">-- Select Time Slot --</option>
                  <option value="09:00-10:00">09:00-10:00</option>
                  <option value="10:00-11:00">10:00-11:00</option>
                  <option value="11:00-12:00">11:00-12:00</option>
                  <option value="12:00-01:00">12:00-01:00</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
