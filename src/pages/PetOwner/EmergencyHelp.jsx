import React, { useEffect } from "react";
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import "./EmergencyHelp.css";

const EmergencyHelp = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show"); // 👈 animate hoga
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PetOwnerNavbar />

   
      <section className="emergencyhelp-hero-section">
        <div className="container">
          <h1 className="emergencyhelp-hero-heading">
      Emergency & Vet Help
          </h1>
          
        </div>
      </section>

    
      <div className="body">
        <section className="section-with-bg split-section">
          <div className="split-container">
            
            <div className="split-left">
              <h1 className="section-title">24/7 Emergency Helplines</h1>
              <div className="cards-grid">
                <div className="card">
                  <div className="text">
                    <i className="fas fa-stethoscope card-icon"></i>
                    <span>Vet Emergency</span>
                    <p className="subtitle">Call for immediate assistance</p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-capsules card-icon"></i>
                    <span>Pet Poison Helpline</span>
                    <p className="subtitle">Get instant advice for poisoning</p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-paw card-icon"></i>
                    <span>Animal Rescue</span>
                    <p className="subtitle">Report stray or injured animals</p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-comments card-icon"></i>
                    <span>24/7 Vet Chat</span>
                    <p className="subtitle">Online consultation anytime</p>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="separator"></div>

            
            <div className="split-right">
              <h2 className="section-title">Contact Us</h2>
              <div className="cards-grid">
                <div className="card">
                  <div className="text">
                    <i className="fas fa-map-marker-alt card-icon"></i>
                    <span>Location</span>
                    <p className="subtitle">
                      123 Pet Street, Pet City, PC 12345
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-envelope card-icon"></i>
                    <span>Email</span>
                    <p className="subtitle">support@petcare.com</p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-phone-alt card-icon"></i>
                    <span>Phone</span>
                    <p className="subtitle">+1 234 567 8900</p>
                  </div>
                </div>
                <div className="card">
                  <div className="text">
                    <i className="fas fa-fax card-icon"></i>
                    <span>Fax</span>
                    <p className="subtitle">+1 234 567 8901</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EmergencyHelp;
