import React, { useState, useEffect } from "react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
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
        setError("An error occurred while fetching doctors");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setModalOpen(false);
  };

  const handleAppointment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          userId: "user123", // Replace with logged-in user ID
          date: new Date().toISOString(), // Example date
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Appointment confirmed with Dr. ${selectedDoctor.username}`);
        handleCloseModal();
      } else {
        alert("Failed to confirm appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Doctors List
        </h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-gray-100 p-4 rounded-md mb-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">
                {doctor.username}
              </p>
              <p className="text-sm text-gray-600">{doctor.email}</p>
            </div>
            <button
              onClick={() => handleOpenModal(doctor)}
              className="text-blue-500 hover:underline"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Confirm Appointment for Dr. {selectedDoctor.username}
            </h3>
            <button
              onClick={handleAppointment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Confirm Appointment
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-4 text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
