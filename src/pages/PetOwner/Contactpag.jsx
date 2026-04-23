import { useEffect } from "react";
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import "./Contactpag.css";

function Contactus() {
  // Scroll animation effect
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
    alert("Thank you! Your message has been submitted 🐾");
    e.target.reset(); 
  };

  return (
    <>
      <PetOwnerNavbar />

      
      <section className="contact-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="contact-hero-heading">Contact Us</h1>
         
        </div>
      </section>

      
      <section className="contact-section-gradient">
        <div className="container">
          <div className="text-center mb-5 scroll-animate">
            <h1 className="fw-bold display-5 animated-main-heading">
              Your Pet Matters ~ <span>Contact Us Today!</span>
            </h1>
          </div>

          <div className="row g-4">
      
            <div className="col-lg-6 scroll-animate form-animate">
              <h6 className="fw-bold mb-3">Contact Form</h6>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
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
                <div className="col-12">
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
                <div className="col-12">
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
                <div className="col-12">
                  <label className="contact-form-label fw-semibold">
                    Subject *
                  </label>
                  <input
                    type="text"
                    className="form-control contact-form-field"
                    placeholder="Reason for contact"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="contact-form-label fw-semibold">
                    Message *
                  </label>
                  <textarea
                    className="form-control contact-form-field"
                    rows="4"
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="contact-form-label fw-semibold">
                    Attachment
                  </label>
                  <input
                    type="file"
                    className="form-control contact-form-field"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn contact-send-btn">
                    Submit
                  </button>
                </div>
              </form>

              <div className="contact-location mt-5 p-3 border rounded scroll-animate">
                <h6 className="fw-bold mb-3">Our Location</h6>
                <p>
                  <strong>Address:</strong> 123 Pet Street, PetCity, PC 45678
                </p>
                <p>
                  <strong>Email:</strong> info@pawfectcare.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (123) 456-7890
                </p>
                <p>
                  <strong>Opening Hours:</strong> Mon-Sat 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="col-lg-6 scroll-animate img-animate">
              <iframe
                title="Shelter Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.2264762059967!2d-122.42177842392674!3d37.77492957119344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b42c1e7%3A0xdee5f08a90f1d2b7!2sAnimal%20Shelter!5e0!3m2!1sen!2sus!4v1691844233495!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                className="full-map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contactus;
