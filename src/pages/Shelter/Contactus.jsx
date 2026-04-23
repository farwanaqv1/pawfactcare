import { useEffect } from "react";
import ShelterNavbar from "./../../components/navbar/ShelterNavbar";

import "./Contactus.css";

function Contactus() {
  
  useEffect(() => {
    const scrollElements = document.querySelectorAll(
      ".scroll-animate, .img-animate, .form-animate"
    );

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


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your adoption request has been submitted ");
  };

  return (
    <>
      <ShelterNavbar />

      
      <section className="contact-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="contact-hero-heading">Contact & Adopt</h1>
        </div>
      </section>

   
      <section className="contact-section-gradient">
        <div className="container">
          <div className="text-center mb-5 scroll-animate">
            <h1 className="fw-bold display-5 animated-main-heading">
              Give Them <span>Love</span>, Get a <span>Friend</span> for Life 🐾
            </h1>
          </div>

          <div className="row g-4">
         
            <div className="col-lg-6 scroll-animate img-animate">
              <div className="mb-4">
                <h6 className="fw-bold">Shelter Address:</h6>
                <p className="mb-1">123 Animal Care Street, Cityville, USA</p>
              </div>
              <div className="mb-4">
                <h6 className="fw-bold">Phone:</h6>
                <p className="mb-1" style={{ color: "#c29b68" }}>
                  +1 (555) 123-4567
                </p>
              </div>
              <img
                src="/cimg.jpg"
                alt="Shelter"
                className="img-fluid contact-img"
              />
            </div>

            <div className="col-lg-6 scroll-animate form-animate">
              <h6 className="fw-bold mb-3">Adoption Enquiry Form</h6>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    className="form-control contact-form-field"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control contact-form-field"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    className="form-control contact-form-field"
                    placeholder="Enter your phone"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Pet Type *
                  </label>
                  <select className="form-control contact-form-field" required>
                    <option value="">Select Pet</option>
                    <option value="dog">🐶 Dog</option>
                    <option value="cat">🐱 Cat</option>
                    <option value="rabbit">🐇 Rabbit</option>
                    <option value="fish">🐟 Fish</option>
                    <option value="bird">🐦 Bird</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Preferred Visiting Date *
                  </label>
                  <input
                    type="date"
                    className="form-control contact-form-field"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="contact-form-label fw-semibold">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    className="form-control contact-form-field"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="contact-form-label fw-semibold">
                    Why do you want to adopt? *
                  </label>
                  <textarea
                    className="form-control contact-form-field"
                    rows="3"
                    placeholder="Tell us your reason..."
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="contact-form-label fw-semibold">
                    Additional Message
                  </label>
                  <textarea
                    className="form-control contact-form-field"
                    rows="3"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn contact-send-btn">
                    Submit Adoption Request 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      
      <section className="map-section scroll-animate">
        <div className="container">
         
          <div className="shelter-info">
            <h3>Happy Paws Animal Shelter</h3>
            <p>Providing love and care to every furry friend 🐾</p>
            <p>Come visit us during opening hours to meet our lovely pets!</p>
          </div>

          <div className="row g-4">
          
            <div className="col-lg-4 timings">
              <h5 className="fw-bold mb-3">Shelter Timings 🕒</h5>
              <ul>
                <li>
                  <span>Monday</span> ---- 09:00 - 11:00
                </li>
                <li>
                  <span>Tuesday</span> ---- 09:00 - 11:00
                </li>
                <li>
                  <span>Wednesday</span> ---- 09:00 - 11:00
                </li>
                <li>
                  <span>Thursday</span> ---- 09:00 - 11:00
                </li>
                <li>
                  <span>Friday</span> ---- 09:00 - 11:00
                </li>
                <li>
                  <span>Saturday</span> ---- 10:00 - 14:00
                </li>
                <li>
                  <span>Sunday</span> ---- Closed
                </li>
              </ul>
            </div>

            <div className="col-lg-8 map-container">
              <iframe
                title="Shelter Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.2264762059967!2d-122.42177842392674!3d37.77492957119344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b42c1e7%3A0xdee5f08a90f1d2b7!2sAnimal%20Shelter!5e0!3m2!1sen!2sus!4v1691844233495!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Contactus;