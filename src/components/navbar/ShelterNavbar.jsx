import { NavLink } from "react-router-dom";
import { useState } from "react";
import {Link} from 'react-router-dom';
import "./ShelterNavbar.css";

function ShelterNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="shelter-navbar">
   
      <Link to='/'>
      <div className="shelter-logo">
        <img src="/logopet.png" alt="Shelter_Care" className="shelter-logo-img" />
      </div>
      </Link>
      

      
      <button
        className="shelter-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

    
      <ul className={`shelter-nav-links ${menuOpen ? "show" : ""}`}>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/success-stories">Success Stories</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/contactus">Contact Us</NavLink></li>
      </ul>

   
      <div className="shelter-wave"></div>
    </nav>
  );
}

export default ShelterNavbar;
