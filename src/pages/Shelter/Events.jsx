import React, { useEffect, useState } from "react";
import "./Events.css";
import ShelterNavbar from "./../../components/navbar/ShelterNavbar";

const upcomingEvents = [
  {
    id: 1,
    title: "Pet Adoption Drive",
    date: "25 Sep 2025",
    description:
      "Come meet adorable pets ready for adoption and find your new furry friend.",
    image: "/ev1.webp",
  },
  {
    id: 2,
    title: "Free Vaccination Camp",
    date: "28 Sep 2025",
    description:
      "Ensure your pets stay healthy. Free vaccinations available for all pets.",
    image: "/ev2.jpg",
  },
  {
    id: 3,
    title: "Dog Grooming Workshop",
    date: "30 Sep 2025",
    description:
      "Learn professional grooming tips for your pets in this hands-on workshop.",
    image: "/ev3.jpg",
  },
  {
    id: 4,
    title: "Community Pet Health Checkup",
    date: "2 Oct 2025",
    description:
      "Get your pets’ health checked by experienced veterinarians in your area.",
    image: "/ev4.jpg",
  },
];

const Events = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-09-25T10:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ShelterNavbar />

     
      <section className="events-hero-section d-flex flex-column justify-content-center text-center">
        <div className="events-hero-container">
          <h1 className="events-hero-heading">Events</h1>
        </div>
      </section>

      <section className="events-intro container text-center">
        <h2 className="events-main-heading">Upcoming Pet Events</h2>
      </section>

      <div className="events-cards-grid container">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="events-card">
            <div className="events-card-image">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="events-card-content">
              <h3 className="events-card-title">{event.title}</h3>
              <p className="events-card-description">{event.description}</p>
              <div className="events-card-footer">
                <span className="events-card-date">{event.date}</span>
                <button className="events-card-button">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <section className="featured-event">
        <h2>Special Adoption Drive</h2>
        <p>
          Don't miss our biggest adoption drive of the year! Reserve your spot
          and meet adorable pets.
        </p>
        <div className="countdown-timer">
          <div className="countdown-item">{timeLeft.days} Days</div>
          <div className="countdown-item">{timeLeft.hours} Hours</div>
          <div className="countdown-item">{timeLeft.minutes} Minutes</div>
          <div className="countdown-item">{timeLeft.seconds} Seconds</div>
        </div>
      </section>
    </>
  );
};

export default Events;
