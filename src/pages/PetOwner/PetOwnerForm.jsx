import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPaw, FaUser, FaArrowLeft } from "react-icons/fa";
import "./petownerForm.css";

const PetOwnerForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = location.state?.firstName || "";

  const [petData, setPetData] = useState({
    ownerName: firstName,
    petName: "",
    species: "",
    breed: "",
    age: "",
    vaccination: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("ownerName", petData.ownerName);
    localStorage.setItem("petName", petData.petName);

    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);

    navigate("/PetOwner", { state: petData });

    setPetData({
      ownerName: firstName,
      petName: "",
      species: "",
      breed: "",
      age: "",
      vaccination: "",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    scrollElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="petowner-wrapper">
      {/* ✅ Back button */}
      <button className="petowner-back-btn" onClick={handleBack}>
        <FaArrowLeft /> Back
      </button>

      <div className="petowner-left animate-on-scroll">
        <div className="petowner-icon">
          <FaPaw />
        </div>
        <h5>Welcome to Paw-Haven</h5>
        <h2>Because Every Pet Deserves Love & Care</h2>
        <p>
          Register now to keep your beloved pet’s details handy for quick
          appointments and better health tracking.
        </p>
        <ul>
          <li>Quick Access to Medical Records</li>
          <li>Vaccination Reminders</li>
          <li>One-Click Vet Booking</li>
        </ul>
      </div>

      <div className="petowner-right animate-on-scroll">
        <div className="form-bg-overlay"></div>
        <div className="petowner-icon">
          <FaUser />
        </div>
        <h3 className="petowner-heading">Pet Owner Registration</h3>
        <h2 className="petowner-title">Create Your Pet Profile</h2>

        <form onSubmit={handleSubmit} className="petowner-form">
          <div className="petowner-row">
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name *"
              value={petData.ownerName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="petName"
              placeholder="Pet Name *"
              value={petData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="petowner-row">
            <input
              type="text"
              name="species"
              placeholder="Species *"
              value={petData.species}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed *"
              value={petData.breed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="petowner-row">
            <input
              type="number"
              name="age"
              placeholder="Age *"
              value={petData.age}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="vaccination"
              placeholder="Vaccination Info * (e.g. Rabies)"
              value={petData.vaccination}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="petowner-submit">
            Register
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Welcome, {petData.ownerName || firstName}!</h2>
            <p>Your pet profile has been created successfully.</p>
            <button className="modal-close" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetOwnerForm;
