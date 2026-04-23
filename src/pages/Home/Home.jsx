import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Loader = () => (
  <div className="loader-container">
    <img src="/abc.gif" alt="Loading..." className="loader-gif" />
  </div>
);

const Home = ({ onSubmit }) => {
  const [formData, setFormData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cursorRef = useRef(null);

 
  useEffect(() => {
    setLoading(true);
    fetch("/data/home.json")
      .then((res) => res.json())
      .then((data) => {
        setFormData(data.form);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && role) {
      if (role === "shelter") navigate("/gallery");
      else if (role === "petOwner") navigate("/pet-owner-form");
      else if (role === "veterinarian") navigate("/vetForm");
      else {
        setShowModal(true);
        if (onSubmit) onSubmit({ firstName, role });
      }
    } else {
      alert("Please enter your name and select a role.");
    }
  };

  const closeModal = () => setShowModal(false);

  if (loading) return <Loader />;

  return (
    <section
      className="home-hero no-scroll"
      style={{ backgroundImage: `url(${formData?.background})` }}
    >
      <div className="home-overlay">
        <form className="home-formCard" onSubmit={handleSubmit}>
          <h1>{formData?.title}</h1>
          <p className="home-subtitle">{formData?.subtitle}</p>
          <p className="home-subtitle">They deserve forever love</p>

          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="home-input"
          />

          <div className="home-radioGroup">
            <label className="home-radioLabel">
              Select the user category you belong to:
            </label>

            <label className="home-radioOption">
              <input
                type="radio"
                name="role"
                value="petOwner"
                onChange={(e) => setRole(e.target.value)}
              />
              Pet Owner
            </label>

            <label className="home-radioOption">
              <input
                type="radio"
                name="role"
                value="veterinarian"
                onChange={(e) => setRole(e.target.value)}
              />
              Veterinarian
            </label>

            <label className="home-radioOption">
              <input
                type="radio"
                name="role"
                value="shelter"
                onChange={(e) => setRole(e.target.value)}
              />
              Animal Shelter / Rescue Volunteer
            </label>
          </div>

          <button type="submit" className="home-submitBtn">
            Continue
          </button>
        </form>
      </div>

      {showModal && (
        <div className="home-modalOverlay">
          <div className="home-modal">
            <h2>Welcome, {firstName}! 🎉</h2>
            <p>
              You’ve entered as <strong>{role}</strong>.
            </p>
            <button onClick={closeModal} className="home-modalBtn">
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
