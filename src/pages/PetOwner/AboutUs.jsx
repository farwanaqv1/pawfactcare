import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";


const CircularCounter = ({ target, duration, color, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    let start = 0;
    const incrementTime = Math.floor(duration / target);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, startAnimation]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (count / 100) * circumference;

  return (
    <div className="About-circular-counter">
      <svg width="150" height="150">
        <circle cx="75" cy="75" r={radius} stroke="#eee" strokeWidth="12" fill="none" />
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s linear" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="700" fill="#2d2d5a">
          {count}%
        </text>
      </svg>
    </div>
  );
};


const teamMembers = [
  { name: "Maham Khalid", role: "Founder", img: "/team1.jpg", desc: "20+ years of experience in pet care.", socials: { fb: "#", li: "#", tw: "#" } },
  { name: "Farwa Naqvi", role: "CEO", img: "/team2.jpg", desc: "Leading with innovation and love for animals.", socials: { fb: "#", li: "#", tw: "#" } },
  { name: "Aysha Siddiq", role: "Groomer", img: "/team2.webp", desc: "Expert in grooming.", socials: { fb: "#", li: "#", tw: "#" } },
  { name: "Sidra Haroon", role: "Groomer", img: "/team3.webp", desc: "Passionate about pets.", socials: { fb: "#", li: "#", tw: "#" } },
  { name: "Syeda Ayra", role: "Veterinarian", img: "/team4.jpeg", desc: "Dedicated to pet health.", socials: { fb: "#", li: "#", tw: "#" } },
  { name: "Ishrat Riaz", role: "Trainer", img: "/team6.jpg", desc: "Helping pets learn and grow.", socials: { fb: "#", li: "#", tw: "#" } },
];

const About = () => {
  const [animateCounters, setAnimateCounters] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");

    const handleScroll = () => {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          section.classList.add("visible");
          if (section.id === "skillset-section") setAnimateCounters(true);
        } else {
          section.classList.remove("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossOrigin="anonymous" />
      <PetOwnerNavbar />

      <section className="aboutus-hero-section">
        <div className="container">
          <h1 className="aboutus-hero-heading">About Us</h1>
        </div>
      </section>

      <section id="about-section" className="About-section scroll-section">
        <div className="About-content">
          
          <h2 className="About-title">
          About Our   <br /> Portal<span className="About-dot">.</span>
          </h2>
          <p className="About-text">
At every CarePress location, your beloved pet enjoys their own private suite designed for comfort and safety. Each suite is meticulously cleaned and climate-controlled to ensure a healthy and cozy environment. From gourmet meals tailored to your pet’s dietary needs to engaging activities and playtime, we provide a complete care experience that keeps your pet happy, active, and loved.          </p>
          <div className="About-buttons">
            <button className="About-btn-primary">Make Appointment</button>
            <a href="tel:98787687687" className="About-btn-phone">📞 987-876-876-87</a>
          </div>
        </div>
        <div className="About-image">
          <img src="/S10.jpeg" alt="Woman playing with dog" className="About-img" />
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="About-team-section scroll-section">
        <h2 className="About-team-title">Meet Our Team</h2>
        <div className="About-team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="About-team-card">
              <div className="About-card-bg" style={{ backgroundImage: `url(${member.img})` }}></div>
              <div className="About-background"></div>
              <a href={member.socials.fb}><div className="About-box About-box1"><span className="About-icon"><i className="fab fa-facebook-f"></i></span></div></a>
              <a href={member.socials.li}><div className="About-box About-box2"><span className="About-icon"><i className="fab fa-linkedin-in"></i></span></div></a>
              <a href={member.socials.tw}><div className="About-box About-box3"><span className="About-icon"><i className="fab fa-twitter"></i></span></div></a>
              <div className="About-team-info">
                <h2 className="About-team-name">{member.name}</h2>
                <h3 className="About-role">{member.role}</h3>
                <p className="About-desc">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skillset-section" className="About-skillset-section scroll-section">
        <div className="About-skillset-counters">
          <div className="About-counter">
            <CircularCounter target={50} duration={2000} color="#ff3b81" startAnimation={animateCounters} />
            <h3 className="About-counter-title">Country Capture</h3>
            <p className="About-counter-subtitle">Do it with easy way</p>
          </div>
          <div className="About-counter">
            <CircularCounter target={79} duration={2000} color="#4caf50" startAnimation={animateCounters} />
            <h3 className="About-counter-title">Success Rate</h3>
            <p className="About-counter-subtitle">Do it with easy way</p>
          </div>
        </div>
        <div className="About-skillset-content">
          <span className="About-skillset-subtitle">// Skillset //</span>
          <h2 className="About-skillset-title">Core Type Values</h2>
          <p className="About-skillset-text">
            We go to great lengths to guarantee that your dog is in the best possible care.
          </p>
          <div>
            <img src="/dog1.jpg" alt="Dog care" style={{ width: "80px", borderRadius: "8px" }} />
            <p className="About-skillset-text">
              We provide individualized attention and loving care to all of our Campers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
