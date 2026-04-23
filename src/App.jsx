import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Footer from "./components/footer/Footer";
import Home from "./pages/Home/Home";

import PetOwnerForm from "./pages/PetOwner/PetOwnerForm";
import PetOwner from "./pages/PetOwner/PetOwner";
import AboutUs from "./pages/PetOwner/AboutUs";

import PetProfile from "./pages/PetOwner/PetProfile";
import FeedingGuide from "./pages/PetOwner/FeedingGuide";
import GroomingVideos from "./pages/PetOwner/GroomingVideos";
import HealthTips from "./pages/PetOwner/HealthTips";
import TrainingTips from "./pages/PetOwner/TrainingTips";

import Food from "./pages/PetOwner/Food";
import Toys from "./pages/PetOwner/Toys";
import Essentials from "./pages/PetOwner/Essentials";
import Bedding from "./pages/PetOwner/Bedding";
import Supplements from "./pages/PetOwner/Supplements";

import Feedback from "./pages/PetOwner/Feedback";
import EmergencyHelp from "./pages/PetOwner/EmergencyHelp";
import Contactpag from "./pages/PetOwner/Contactpag";

import Vetform from "./pages/Veterinarian/Vetform";
import VetProfile from "./pages/Veterinarian/VetProfile";
import Bookedslots from "./pages/Veterinarian/Bookedslots";
import Availableslots from "./pages/Veterinarian/Availableslots";
import CaseStudies from "./pages/Veterinarian/CaseStudies";

import Ticker from "./components/widget/Ticker";
import Gallery from "./pages/Shelter/Gallery";
import Contactus from "./pages/Shelter/Contactus";
import SuccessStories from "./pages/Shelter/SuccessStories";
import Events from "./pages/Shelter/Events";
import ClockGeo from "./components/widget/ClockGeo";

// ✅ Import the Chatbot
import Chatbot from "./components/Chatbot";

export default function App() {
  const { pathname } = useLocation();

  // ✅ Check if current page belongs to Pet Owner section (but exclude PetOwnerForm)
  const isPetOwnerPage =
    (pathname.startsWith("/pet-owner") ||
      pathname.startsWith("/PetOwner") ||
      [
        "/aboutus",
        "/petproflie",
        "/feeding-guide",
        "/groomingvedios",
        "/healthtips",
        "/trainingtips",
        "/food",
        "/toys",
        "/essentials",
        "/bedding",
        "/supplements",
        "/contactpag",
        "/feedback",
        "/emergencyhelp",
      ].includes(pathname)) &&
    pathname !== "/pet-owner-form"; // 🚫 exclude PetOwnerForm

  // ✅ Home page has no footer
  const isHome = pathname === "/";

  return (
    <div className="app">
      <ScrollToTop />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/pet-owner-form" element={<PetOwnerForm />} />
          <Route path="/PetOwner" element={<PetOwner />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/ticker" element={<Ticker />} />

          <Route path="/petproflie" element={<PetProfile />} />
          <Route path="/feeding-guide" element={<FeedingGuide />} />
          <Route path="/groomingvedios" element={<GroomingVideos />} />
          <Route path="/healthtips" element={<HealthTips />} />
          <Route path="/trainingtips" element={<TrainingTips />} />

          <Route path="/food" element={<Food />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/essentials" element={<Essentials />} />
          <Route path="/bedding" element={<Bedding />} />
          <Route path="/supplements" element={<Supplements />} />

          <Route path="/contactpag" element={<Contactpag />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/emergencyhelp" element={<EmergencyHelp />} />

          <Route path="/Vetform" element={<Vetform />} />
          <Route path="/VetProfile" element={<VetProfile />} />
          <Route path="/bookedslots" element={<Bookedslots />} />
          <Route path="/availableslots" element={<Availableslots />} />
          <Route path="/casestudies" element={<CaseStudies />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>

      {/* ✅ Footer (hidden on some pages) */}
      {!["/", "/pet-owner-form", "/vetForm"].includes(pathname) && <Footer />}

      {/* ✅ Show Chatbot only on Pet Owner pages except PetOwnerForm */}
      {isPetOwnerPage && <Chatbot />}
    </div>
  );
}
