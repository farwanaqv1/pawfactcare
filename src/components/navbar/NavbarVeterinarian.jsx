import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavbarVeterinarian.css";
import ClockGeo from "../widget/ClockGeo";
import VisitorCounter from "../widget/VisitorCounter";

function VetNavbar() {
  const [vetName, setVetName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("vetName");
    if (savedName) setVetName(savedName);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (openDropdown !== null) setOpenDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openDropdown]);

  return (
    <nav className="petowner-navbar">
      
      <div className="petowner-logo">
        <img src="/logopet.png" alt="Vet Portal" className="petowner-logo-img" />
      </div>

      
      <button className="petowner-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      
      <ul className={`petowner-nav-links ${menuOpen ? "show" : ""}`}>
        <li>
          <NavLink to="/VetProfile">Profile</NavLink>
        </li>

        <li
          className={`petowner-dropdown ${openDropdown === "timeslots" ? "open" : ""}`}
          onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown("timeslots")}
          onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
          onClick={() =>
            window.innerWidth <= 768 &&
            setOpenDropdown(openDropdown === "timeslots" ? null : "timeslots")
          }
        >
          <span>Time Slots</span>
          <ul className="petowner-dropdown-menu">
            <li>
              <NavLink to="/bookedslots">Booked Slots</NavLink>
            </li>
            <li>
              <NavLink to="/availableslots">Available Slots</NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink to="/casestudies">Case Studies</NavLink>
        </li>
      </ul>

      <div className="petowner-owner">{vetName && <span>👨‍⚕️ hello {vetName}</span>}</div>

    
      <div className="petowner-wave"></div>

      <ClockGeo/>
      
<VisitorCounter/>
    </nav>
  );
}

export default VetNavbar;
