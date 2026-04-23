import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PetOwner.css';
import data from './PetOwner.json';
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import ClockGeo from "../../components/widget/ClockGeo";
import groom from './Grooming.json';

const PetOwner = () => {
  const location = useLocation();
  const formPetData = location.state; // Form se aaya data

  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount] = useState(Math.floor(Math.random() * 1001) + 500);
  const [locationState, setLocationState] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state

  // Agar form ka data hai to use karo, warna JSON ka default data
  const [petData, setPetData] = useState(
    formPetData
      ? {
          name: formPetData.petName,
          species: formPetData.species,
          breed: formPetData.breed,
          age: formPetData.age,
          vaccinations: [
            {
              name: formPetData.vaccination,
              date: "2025-01-01",
              nextDue: "2026-01-01"
            }
          ]
        }
      : data?.petInfo?.pet || {}
  );

  const [openModule, setOpenModule] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [activeSection, setActiveSection] = useState('pet-profile');

  useEffect(() => {
    // Loader simulation
    const timer = setTimeout(() => setLoading(false), 800); // 0.8s loader
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setLocationState({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => setLocationError(error.message)
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }

    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = [
        'pet-profile',
        'feeding-guide',
        'grooming-videos',
        'health-tips',
        'training-tips',
        'products',
        'emergency-contacts'
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVaccinationChange = (index, field, value) => {
    const updatedVaccinations = [...(petData.vaccinations || [])];
    if (updatedVaccinations[index]) {
      updatedVaccinations[index][field] = value;
      setPetData((prev) => ({ ...prev, vaccinations: updatedVaccinations }));
    }
  };

  const handleSave = () => setIsEditing(false);
  const toggleModule = (index) => setOpenModule(openModule === index ? null : index);
  const handleVideoSelect = (video) => setSelectedVideo(video);
  const handleCloseVideo = () => setSelectedVideo(null);
  const handleBuy = (product) => alert(`Added ${product.name} to cart!`);
  const handleCall = (phoneNumber) => (window.location.href = `tel:${phoneNumber}`);

  const categories = ['All', ...new Set(data?.products?.map((product) => product.category))];

  const filteredProducts = (data?.products || [])
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : a.price - b.price));

  // === LOADER SECTION ===
  if (loading) {
    return (
      <div className="loader-container">
        <img
          src="/abc.gif" // Apna loader GIF yahan lagao
          alt="Loading..."
          className="loader-gif"
        />
      </div>
    );
  }

  return (
    <>
      <PetOwnerNavbar scrollToSection={scrollToSection} />
      <div className="petowner-container">
        {/* Hero Section */}
        <section className="petowner-hero-section d-flex flex-column justify-content-center text-center">
          <div className="container">
            <h1 className="petowner-hero-heading">Pet Owner</h1>
          </div>
        </section>

        <main className="petowner-main">

          {/* Pet Profile Section */}
          <section id="pet-profile" className="petowner-section">
            <h2 className="section-title">Pet Profile</h2>
            <div className="petowner-card">
              {!isEditing ? (
                <>
                  <div className="pet-info-grid">
                    <div className="info-item"><span className="info-label">Name:</span><span className="info-value">{petData.name}</span></div>
                    <div className="info-item"><span className="info-label">Species:</span><span className="info-value">{petData.species}</span></div>
                    <div className="info-item"><span className="info-label">Breed:</span><span className="info-value">{petData.breed}</span></div>
                    <div className="info-item"><span className="info-label">Age:</span><span className="info-value">{petData.age} years</span></div>
                  </div>

                  <h3 className="subsection-title">Vaccinations</h3>
                  <div className="vaccination-grid">
                    {(petData.vaccinations || []).map((vax, index) => (
                      <div key={index} className="vaccination-card">
                        <h4 className="vaccination-name">{vax.name}</h4>
                        <div className="vax-details">
                          <div><span className="vax-label">Date:</span><span className="vax-value">{vax.date}</span></div>
                          <div><span className="vax-label">Next Due:</span><span className="vax-value">{vax.nextDue}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="petowner-button edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </>
              ) : (
                <>
                  <div className="form-grid">
                    <div className="petowner-form-group"><label htmlFor="name">Name:</label><input type="text" id="name" name="name" value={petData.name} onChange={handleInputChange} /></div>
                    <div className="petowner-form-group"><label htmlFor="species">Species:</label><input type="text" id="species" name="species" value={petData.species} onChange={handleInputChange} /></div>
                    <div className="petowner-form-group"><label htmlFor="breed">Breed:</label><input type="text" id="breed" name="breed" value={petData.breed} onChange={handleInputChange} /></div>
                    <div className="petowner-form-group"><label htmlFor="age">Age:</label><input type="number" id="age" name="age" value={petData.age} onChange={handleInputChange} /></div>
                  </div>

                  <h3 className="subsection-title">Vaccinations</h3>
                  {(petData.vaccinations || []).map((vax, index) => (
                    <div key={index} className="vaccination-edit-card">
                      <div className="petowner-form-group"><label htmlFor={`vax-name-${index}`}>Vaccine Name:</label><input type="text" id={`vax-name-${index}`} value={vax.name} onChange={(e) => handleVaccinationChange(index, "name", e.target.value)} /></div>
                      <div className="petowner-form-group"><label htmlFor={`vax-date-${index}`}>Date:</label><input type="date" id={`vax-date-${index}`} value={vax.date} onChange={(e) => handleVaccinationChange(index, "date", e.target.value)} /></div>
                      <div className="petowner-form-group"><label htmlFor={`vax-nextDue-${index}`}>Next Due:</label><input type="date" id={`vax-nextDue-${index}`} value={vax.nextDue} onChange={(e) => handleVaccinationChange(index, "nextDue", e.target.value)} /></div>
                    </div>
                  ))}
                  <div className="button-group">
                    <button className="petowner-button save-btn" onClick={handleSave}>Save Changes</button>
                    <button className="petowner-button cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Feeding Guide Section */}
          <section id="feeding-guide" className="petowner-section">
            <h2 className="section-title">Feeding Guide</h2>
            <p className="petowner-tips-intro">Detailed feeding charts to ensure your pet's health and nutrition.</p>
            {data.feedingGuide?.charts?.length > 0 ? (
              <div className="feeding-charts-grid">
                {data.feedingGuide.charts.map((chart, index) => (
                  <div key={index} className="feeding-chart-card">
                    <div className="feeding-chart-header">
                      <h3 className="feeding-chart-title">{chart.type}</h3>
                    </div>
                    <div className="feeding-chart-body">
                      <table className="feeding-chart-table">
                        <thead>
                          <tr>
                            {chart.headers.map((header, hIndex) => (
                              <th key={hIndex}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {chart.rows.map((row, rIndex) => (
                            <tr key={rIndex}>
                              {row.map((cell, cIndex) => (
                                <td key={cIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p>No feeding charts available yet.</p>}
          </section>

          {/* Grooming Videos Section */}
          <section id="grooming-videos" className="petowner-section">
            <h2>Grooming Videos</h2>
            <p className="petowner-section-subtitle">Learn professional grooming techniques for your pets</p>
            <div className="petowner-videos-grid">
              {groom.groomingVideos?.map((video, index) => (
                <div key={index} className="petowner-video-card" onClick={() => handleVideoSelect(video)}>
                  <div className="petowner-video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} className="thumbnail-img" />
                    <div className="thumbnail-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                  <div className="petowner-video-content">
                    <h3 className="video-title">{video.title}</h3>
                    {video.description && <p className="video-description">{video.description}</p>}
                    <div className="video-info">
                      {video.author && <span className="video-author">By {video.author}</span>}
                      {video.duration && <span className="video-duration">{video.duration}</span>}
                      {video.views && <span className="video-views">{video.views} views</span>}
                    </div>
                    <button className="video-watch-btn">Watch Now</button>
                  </div>
                </div>
              ))}
            </div>

            {selectedVideo && (
              <div className="video-modal" onClick={handleCloseVideo}>
                <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-btn" onClick={handleCloseVideo}>×</button>
                  <iframe width="100%" height="500" src={selectedVideo.videoUrl} title={selectedVideo.title} frameBorder="0" allowFullScreen></iframe>
                  <div className="modal-video-details">
                    <h3>{selectedVideo.title}</h3>
                    {selectedVideo.description && <p>{selectedVideo.description}</p>}
                    {selectedVideo.author && <p><strong>Author:</strong> {selectedVideo.author}</p>}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Health Tips Section */}
          <section id="health-tips" className="petowner-section">
            <h2>Health Tips</h2>
            <p className="petowner-section-subtitle">Tips to keep your pet healthy and happy</p>
            <div className="petowner-videos-grid">
              {(data.healthTips || []).slice(0, 6).map((tip, index) => (
                <div key={index} className="petowner-video-card">
                  <div className="petowner-video-thumbnail">
                    {tip.type === 'video' && tip.videoId.endsWith(".mp4") ? (
                      <video width="100%" height="200" controls>
                        <source src={tip.videoId} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe width="100%" height="200" src={tip.videoId} title={tip.title} frameBorder="0" allowFullScreen></iframe>
                    )}
                  </div>
                  <div className="petowner-video-content">
                    <h3 className="video-title">{tip.title}</h3>
                    {tip.text && <p className="video-description">{tip.text}</p>}
                    <div className="video-info">
                      <span className="video-author">Expert Advice</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Training Tips Section */}
          <section id="training-tips" className="petowner-section">
            <h2>Training Tips</h2>
            <p className="petowner-section-subtitle">Step-by-step guides and audio tips for training your pet</p>
            <div className="petowner-training-grid">
              {(data.trainingTips || []).map((module, index) => (
                <div key={index} className={`training-card ${openModule === index ? 'active' : ''}`}>
                  <div className="training-card-header" onClick={() => toggleModule(index)}>
                    <h3 className="training-title">{module.title}</h3>
                    <span className="accordion-icon">{openModule === index ? '−' : '+'}</span>
                  </div>
                  {openModule === index && (
                    <div className="training-card-content">
                      {module.text && <p>{module.text}</p>}
                      {module.audioSrc && (
                        <audio controls>
                          <source src={module.audioSrc} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Widgets Section */}
          <section className="petowner-widget-section">
            <div className="petowner-widget-item clock">
              <div className="petowner-widget-content">
                <ClockGeo />
              </div>
            </div>
            <div className="petowner-widget-item visitor">
              <div className="petowner-widget-content">
                <h2 className="widget-title">Visitor Counter</h2>
                <p className="widget-text">You are visitor number <strong>{visitorCount}</strong>.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default PetOwner;
