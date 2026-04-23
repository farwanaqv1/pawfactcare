import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClinicMedical, FaUserMd, FaArrowLeft } from "react-icons/fa";
import "./Vetform.css";

const VetForm = () => {
  const navigate = useNavigate();

  const [vetData, setVetData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    image: "",
    bookedSlots: "",
    availableSlots: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setVetData({ ...vetData, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setVetData({ ...vetData, [name]: value });
    }

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!vetData.name) newErrors.name = true;
    if (!vetData.email) newErrors.email = true;
    if (!vetData.phone) newErrors.phone = true;
    if (!vetData.specialization) newErrors.specialization = true;
    if (!vetData.image) newErrors.image = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    localStorage.setItem("vetProfile", JSON.stringify(vetData));
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/VetProfile");
  };

  const handleBack = () => {
    navigate(-1); // previous page
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".vet-animate");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="vet-wrapper">
      {/* Back Button */}
      <button className="vet-back-btn" onClick={handleBack}>
        <FaArrowLeft /> Back
      </button>

      <div className="vet-left vet-animate">
        <div className="vet-icon">
          <FaClinicMedical />
        </div>
        <h5>Greetings from Paw-Haven</h5>
        <h2>Caring for Every Pet, One Paw at a Time</h2>
        <p>
          Specialized care for all breeds and sizes. Join us in keeping pets
          healthy and happy.
        </p>
        <ul>
          <li>Preventive Care</li>
          <li>Surgery & Treatment</li>
          <li>Dental & Skin Care</li>
          <li>Pet Nutrition & Coaching</li>
        </ul>
      </div>

      <div className="vet-right vet-animate">
        <div className="vet-icon">
          <FaUserMd />
        </div>
        <h3 className="vet-heading">Veterinarian Registration</h3>
        <h2 className="vet-title">Create Your Vet Profile</h2>

        <form className="vet-form" onSubmit={handleSubmit}>
          <div className="vet-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={vetData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={vetData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
          </div>

          <div className="vet-row">
            <input
              type="number"
              name="phone"
              placeholder="Phone *"
              value={vetData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />
            <select
              name="specialization"
              value={vetData.specialization}
              onChange={handleChange}
              className={errors.specialization ? "error" : ""}
            >
              <option value="">Select Specialization</option>
              <option value="General Vet">General Vet</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Dentist">Dentist</option>
            </select>
          </div>

          <label
            htmlFor="vetImageUpload"
            className={`vet-file-label ${errors.image ? "error" : ""}`}
          >
            Upload Your Image
          </label>
          <input
            type="file"
            id="vetImageUpload"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <textarea
            name="bookedSlots"
            type="text"
            placeholder="Booked Slots (comma separated)"
            value={vetData.bookedSlots}
            onChange={handleChange}
          />
          <textarea
            name="availableSlots"
            placeholder="Available Slots (comma separated)"
            value={vetData.availableSlots}
            onChange={handleChange}
          />

          <button type="submit" className="vet-submit">
            Submit
          </button>
        </form>
      </div>

      {showModal && (
        <div className="vet-modal-overlay">
          <div className="vet-modal-content">
            <h2>Welcome, Dr. {vetData.name}!</h2>
            <p>Your veterinarian profile has been registered successfully.</p>
            <button className="vet-modal-close" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VetForm;
