import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PetOwnerNavbar.css";
import Ticker from "../widget/Ticker";

function PetOwnerNavbar({ scrollToSection }) {
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedOwner = localStorage.getItem("ownerName");
    const savedPet = localStorage.getItem("petName");

    if (savedOwner) setOwnerName(savedOwner);
    if (savedPet) setPetName(savedPet);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (openDropdown !== null) setOpenDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openDropdown]);

  return (
    <>
      <Ticker />
      <nav className="petowner-navbar">
        {/* Logo */}
        <div className="petowner-logo">
          <Link to="/">
            <img
              src="/logopet.png"
              alt="Pawfect_Care"
              className="petowner-logo-img"
            />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="petowner-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Nav Links */}
        <ul className={`petowner-nav-links ${menuOpen ? "show" : ""}`}>
          
          <li
            className={`petowner-dropdown ${
              openDropdown === "petCare" ? "open" : ""
            }`}
            onMouseEnter={() =>
              window.innerWidth > 768 && setOpenDropdown("petCare")
            }
            onMouseLeave={() =>
              window.innerWidth > 768 && setOpenDropdown(null)
            }
            onClick={() =>
              window.innerWidth <= 768 &&
              setOpenDropdown(openDropdown === "petCare" ? null : "petCare")
            }
          >
            <Link to="/PetOwner">
              <span>Pet Care </span> <span className="arrow"> ▼</span>
            </Link>

            <ul className="petowner-dropdown-menu">
              <li>
                <button
                  onClick={() => scrollToSection("pet-profile")}
                  className="dropdown-btnn"
                >
                  Pet Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("feeding-guide")}
                  className="dropdown-btnn"
                >
                  Feeding Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("grooming-videos")}
                  className="dropdown-btnn"
                >
                  Grooming Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("training-tips")}
                  className="dropdown-btnn"
                >
                  Training Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("health-tips")}
                  className="dropdown-btnn"
                >
                  Health Tips
                </button>
              </li>
            </ul>
          </li>

          {/* Pet Products Dropdown */}
          <li
            className={`petowner-dropdown ${
              openDropdown === "products" ? "open" : ""
            }`}
            onMouseEnter={() =>
              window.innerWidth > 768 && setOpenDropdown("products")
            }
            onMouseLeave={() =>
              window.innerWidth > 768 && setOpenDropdown(null)
            }
            onClick={() =>
              window.innerWidth <= 768 &&
              setOpenDropdown(openDropdown === "products" ? null : "products")
            }
          >
            <span>Pet Products</span>
            <ul className="petowner-dropdown-menu">
              <li>
                <NavLink to="/food" className='dropdown-btnn'>Dog/Cat Food</NavLink>
              </li>
              <li>
                <NavLink to="/toys" className='dropdown-btnn'>Toys</NavLink>
              </li>
              <li>
                <NavLink to="/essentials" className='dropdown-btnn'>Grooming Essentials</NavLink>
              </li>
              <li>
                <NavLink to="/bedding" className='dropdown-btnn'>Bedding & Apparel</NavLink>
              </li>
              <li>
                <NavLink to="/supplements" className='dropdown-btnn'>Health Supplements</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/aboutus">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/emergencyhelp">Emergency & Vet Help</NavLink>
          </li>
          <li>
            <NavLink to="/feedback">Feedback</NavLink>
          </li>
          <li>
            <NavLink to="/contactpag">Contact Us</NavLink>
          </li>
        </ul>

        {/* Show Pet or Owner Name */}
        <div className="petowner-owner">
          {petName ? (
            <span>🐾 Welcome {petName}</span>
          ) : ownerName ? (
            <span>👋 Welcome {ownerName}</span>
          ) : null}
        </div>

        <div className="petowner-wave"></div>
      </nav>
    </>
  );
}

export default PetOwnerNavbar;