import React, { useEffect, useState } from "react";
import ShelterNavbar from "./../../components/navbar/ShelterNavbar";
import PetCard from "./../../components/Cards/PetCard";
import petsData from "./../../components/Cards/Pet.json";
import "./Gallery.css";

const Gallery = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  // Loader component directly inside Gallery
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
    // Simulate data loading
    const loadData = () => {
      const shuffled = shuffleArray(petsData);
      setPets(shuffled);
      setFilteredPets(shuffled);
      setTimeout(() => setLoading(false), 1000); // loader 1 sec
    };

    loadData();
  }, []);

  const petTypes = ["All", "Dog", "Cat", "Rabbit", "Bird", "Fish"];

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(10);

    if (filter === "All") {
      setFilteredPets(shuffleArray(pets));
    } else {
      setFilteredPets(
        shuffleArray(
          pets.filter(
            (p) => p.type.trim().toLowerCase() === filter.toLowerCase()
          )
        )
      );
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const directions = ["up", "left", "right"];

  if (loading) return <Loader />; // loader show kare jab tak data load ho raha ho

  return (
    <>
      <ShelterNavbar />

      <section className="gallery hero-section d-flex flex-column justify-content-center text-center">
        <div className="gallery container">
          <h1 className="hero-heading">Pet Adoption Gallery</h1>
        </div>
      </section>

      <div className="gallery-container">
        <h1 className="gallery-title">Find Your Perfect Companion</h1>

        <div className="gallery-filter-buttons">
          {petTypes.map((type) => (
            <button
              key={type}
              className={activeFilter === type ? "gallery-active" : ""}
              onClick={() => handleFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredPets.slice(0, visibleCount).map((pet, index) => (
            <PetCard
              key={pet.id}
              pet={pet}
              direction={directions[index % directions.length]}
            />
          ))}
        </div>

        {visibleCount < filteredPets.length && (
          <div className="show-more-wrapper">
            <button
              className="gallery-show-more-btn"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
