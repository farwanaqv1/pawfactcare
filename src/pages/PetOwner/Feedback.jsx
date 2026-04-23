import { useEffect, useState } from "react";
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import "./Feedback.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    showEmail: true
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your feedback! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
      showEmail: true
    });
  };

  useEffect(() => {
    const scrollElements = document.querySelectorAll(".scroll-animate, .form-animate");

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
    <>
      <PetOwnerNavbar />

      {/* Hero Section */}
      <section className="feedback-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="feedback-hero-heading">Feedback</h1>
        </div>
      </section>

      {/* Form + Side Image */}
      <div className="Feedback-container">
        {/* Left - Form */}
        <div className="Feedback-form-section scroll-animate form-animate">
          <div className="Feedback-form-header">
            <h1>Feedback</h1>
            <p>We'd love to hear from you</p>
          </div>

          <form className="Feedback-form" onSubmit={handleSubmit}>
            <div className="Feedback-form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="Feedback-form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="Feedback-form-group">
              <label htmlFor="message">Your Feedback *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts with us..."
                rows="5"
                required
              ></textarea>
            </div>

            <div className="Feedback-checkbox-group">
              <input
                type="checkbox"
                id="showEmail"
                name="showEmail"
                checked={formData.showEmail}
                onChange={handleChange}
              />
              <label htmlFor="showEmail">Keep my email private</label>
            </div>

            <button type="submit" className="Feedback-submit-btn">
              Send Feedback
            </button>
          </form>
        </div>

        {/* Right - Side Image */}
        <div className="Feedback-image-section scroll-animate">
          <div className="Feedback-image-overlay">
            <h2>Your Opinion Matters</h2>
            <p>Help us improve our services by sharing your experience with us</p>
            <div className="Feedback-features">
              <div className="Feedback-feature">
                <span className="Feedback-feature-icon">✓</span>
                <span>We read all feedback</span>
              </div>
              <div className="Feedback-feature">
                <span className="Feedback-feature-icon">✓</span>
                <span>We respond within 24 hours</span>
              </div>
              <div className="Feedback-feature">
                <span className="Feedback-feature-icon">✓</span>
                <span>Your privacy is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
