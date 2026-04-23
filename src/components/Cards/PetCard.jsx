import React, { useEffect, useRef, useState } from "react";
import "./Petcard.css";

const PetCard = ({ pet, direction = "up" }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => setVisible(entry.isIntersecting)),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`pet-card ${visible ? "visible" : ""} dir-${direction}`}
    >
      <img
        src={pet.image}
        alt={pet.name}
        className={`pet-image ${showDetails ? "zoom" : ""}`}
      />

      <div className={`pet-details ${showDetails ? "show" : ""}`}>
        <h3 className="pet-name">{pet.name}</h3>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p className="desc">{pet.description}</p>
      </div>

      <button
        className="pet-action-btn"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
          <path d="M256 288c-41.8 0-80.6 16.9-109.6 47.3-23.7 24.6-46.4 58.5-46.4 96.7 0 44.2 36.5 80 80 80h152c43.5 0 80-35.8 80-80 0-38.2-22.7-72.1-46.4-96.7C336.6 304.9 297.8 288 256 288zM107.2 250.5c35.3 0 64-35.8 64-80s-28.7-80-64-80-64 35.8-64 80 28.7 80 64 80zm297.6 0c35.3 0 64-35.8 64-80s-28.7-80-64-80-64 35.8-64 80 28.7 80 64 80zM176 176c35.3 0 64-35.8 64-80s-28.7-80-64-80-64 35.8-64 80 28.7 80 64 80zm160 0c35.3 0 64-35.8 64-80s-28.7-80-64-80-64 35.8-64 80 28.7 80 64 80z"/>
        </svg>
      </button>
    </div>
  );
};

export default PetCard;
