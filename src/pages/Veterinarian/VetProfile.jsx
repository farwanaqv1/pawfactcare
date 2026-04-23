import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaStethoscope, FaEnvelope, FaPhone, FaCalendarAlt, FaPaw } from "react-icons/fa";
import "./VetProfile.css";
import { Link } from 'react-router-dom';

const randomHistories = [
  "Regular check-up completed, healthy condition.",
  "Vaccination completed, no complications.",
  "Treated for minor skin allergies.",
  "Dental cleaning done, teeth healthy.",
  "Recovered from mild digestive issue.",
  "Routine surgery completed successfully.",
  "Treated for flea infestation.",
  "Follow-up required in two weeks.",
  "Under observation for mild respiratory issue.",
  "Nutrition plan updated for optimal health."
];

const getRandomHistory = () => {
  return randomHistories[Math.floor(Math.random() * randomHistories.length)];
};

const VetProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // loader state
  const [vetData, setVetData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    image: "",
    bookedSlots: "",
    availableSlots: "",
    pets: []
  });

  // Loader component
  const Loader = () => (
    <div className="loader-container">
      <img
        src="/abc.gif" // apna gif ka path
        alt="Loading..."
        className="loader-gif"
      />
    </div>
  );

  useEffect(() => {
    const data = localStorage.getItem("vetProfile");
    if (data) {
      const parsedData = JSON.parse(data);
      const petsWithRandomHistory = parsedData.pets?.map(pet => ({
        ...pet,
        history: pet.history && pet.history.trim() !== "" ? pet.history : getRandomHistory()
      }));
      setVetData({ ...parsedData, pets: petsWithRandomHistory });
    }
    setTimeout(() => setLoading(false), 1000); // loader 1 sec
  }, []);

  if (loading) return <Loader />; // loader show while loading

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h2>Veterinarian Profile</h2>
          <h2>Dr. {vetData.name} </h2>
        </div>

        <div className="profile-content">
          <div className="left-section">
            <img
              src={vetData.image}
              alt={vetData.name}
              className="profile-img"
            />
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p><FaUserMd /> <strong>Dr. {vetData.name}</strong></p>
              <p><FaStethoscope /> {vetData.specialization}</p>
              <p><FaEnvelope /> {vetData.email}</p>
              <p><FaPhone /> {vetData.phone}</p>
              <br /><br />
              <Link to='/'>
                <button className="back-btn" onClick={() => navigate("/Vetform")}>
                  ← Back to Dashboard
                </button>
              </Link>
            </div>
          </div>

          <div className="right-section">
            <div className="cards">
              <h4><FaCalendarAlt /> Appointment Schedule</h4>
              <hr />
              <div className="slots">
                <p>Booked Time Slots</p>
                {vetData.bookedSlots
                  ?.split(",")
                  .map((slot, i) => (
                    <div key={i} className="slot booked">{slot.trim()}</div>
                  ))}
              </div>
              <div className="slots">
                <p>Available Time Slots</p>
                {vetData.availableSlots
                  ?.split(",")
                  .map((slot, i) => (
                    <div key={i} className="slot available">{slot.trim()}</div>
                  ))}
              </div>
            </div>

            <div className="cards">
              <h4><FaPaw /> Pet Medical Histories</h4>
              <div className="pet-histories">
                <p><strong>Pet History:</strong> Max, a three-year-old Golden Retriever, was adopted from a local animal shelter after being found wandering the streets. </p>
                <p><strong>Case Study:</strong> In late spring, Max developed recurring episodes of lethargy and mild limping after outdoor play. After eight weeks, noticeable improvement was recorded: reduced inflammation, stronger muscle tone, and an increase in activity levels.A detailed analysis of real-life pet care scenarios to learn effective solutions.</p>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default VetProfile;
