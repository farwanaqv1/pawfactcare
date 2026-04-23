import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa"; // react-icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="overlay"></div>

      <div className="container position-relative pt-4 pb-4">
        <div className="row gy-4">
        
          {/* Logo Section */}
          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <img
              src="/logoimg1.png" // Apna logo yahan daalein
              alt="Pawfect Care"
              className="footer-logo mb-3"
            />
            <p className="fw-bold mb-2">
              Loving paws, happy hearts — discover our pet care services.
            </p>
            <p>
              123 Pet Street, Pawsville,
              <br /> CA 90210, USA
            </p>
          </div>

          {/* Links Section */}
          <div className="col-lg-2 col-md-6 text-center text-md-start">
            <ul className="list-unstyled footer-links">
              <h1>Roles</h1>
              <li><a href="/pet-owner-form">Pet Owner</a></li>
              <li><a href="/VetForm">Veterinarian</a></li>
              <li><a href="/Gallery">Shelter</a></li>
              
            </ul>
          </div>

          {/* Contact & Social Icons */}
          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <h1>Follows</h1>
            <br />
            <h6 className="fw-bold mb-2 text-footer">+(084) 456-0789</h6>
            <p>
              <a href="mailto:support@pawfectcare.com" className="text-decoration-none text-footer">
                Support@pawfectcare.com
              </a>
            </p>
            <div className="mt-3 footer-social">
              <a href="#!" className="me-3"><FaFacebookF /></a>
              <a href="#!" className="me-3"><FaInstagram /></a>
              <a href="#!" className="me-3"><FaYoutube /></a>
              <a href="#!"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center small">
          <p className="mb-0">
            © 2025 <span className="text-footer">Pawfect Care</span>. All rights reserved.
          </p>
        </div>

        <div className="footer-watermark">Pawfect</div>
      </div>
    </footer>
  );
};

export default Footer;
