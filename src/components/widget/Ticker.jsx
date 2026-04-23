import { useEffect, useState } from "react";
import styles from "./Ticker.module.css";

export default function Ticker() {
  const [msgs, setMsgs] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [location, setLocation] = useState("Fetching location...");


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || "";
            const country = data.address.country || "";
            setLocation(`${city}, ${country}`);
          } catch {
            setLocation("Location unavailable");
          }
        },
        () => setLocation("Permission denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);


  useEffect(() => {
    fetch("/data/events.json")
      .then((r) => r.json())
      .then((data) => {
        const lines = data.events.map((e) => `${e.date} · ${e.title}`);
        setMsgs([
          `⏰ Current Time: ${time}`,
          `📍 Location: ${location}`,
          " Welcome to Pawfect Care",
          " Free Vet Consultation Every Sunday",
          " New Dog & Cat Toys Just Arrived!",
          " Vaccination Drive: Book Your Slot Today",
          " 20% Off on Premium Dog Food this Week",
          " Emergency Vet Helpline Available 24/7",
          ...lines,
        ]);
      })
      .catch(() =>
        setMsgs([
          `⏰ Current Time: ${time}`,
          `📍 Location: ${location}`,
          " Welcome to Pawfect Care",
          " Free Vet Consultation Every Sunday",
          
        ])
      );
  }, [time, location]); 

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {msgs.concat(msgs).map((m, i) => (
          <span className={styles.item} key={i}>
            • {m}
          </span>
        ))}
      </div>
    </div>
  );
}
