import React, { useState, useEffect } from "react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For tracking selected doctor
  const [modalOpen, setModalOpen] = useState(false); // For tracking modal state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();

        if (response.ok) {
          setDoctors(data); // Update the state with the list of doctors
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

  // Handle modal open
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor
    setModalOpen(true); // Open the modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedDoctor(null); // Clear the selected doctor
    setModalOpen(false); // Close the modal
  };

  // Handle appointment creation
  const handleAppointment = () => {
    alert(`Appointment created for Dr. ${selectedDoctor.username}`);
    handleCloseModal(); // Close the modal after booking
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Doctors List
        </h2>

        {loading && (
          <p className="text-center text-gray-600">Loading doctors...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {doctors.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No doctors available.</p>
        )}

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
              {/* Book Appointment */}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Appointment for Dr. {selectedDoctor.username}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Specialty: {selectedDoctor.specialty}
            </p>
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
