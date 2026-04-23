import { useEffect, useState } from "react";
import styles from "./ClockGeo.module.css";

export default function ClockGeo() {
  const [time, setTime] = useState(new Date());
  const [geo, setGeo] = useState({ location: null, error: null });

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo((g) => ({ ...g, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          // Call OpenStreetMap Nominatim API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          setGeo({
            location:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              data.address.country,
            error: null,
          });
        } catch (err) {
          setGeo({ location: null, error: "Unable to fetch location" });
        }
      },
      (err) => setGeo({ location: null, error: err.message })
    );
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.geostyle}>
        <span className={styles.time}>{time.toLocaleTimeString()}</span>
        <br />
        {geo.location ? (
          <span className={styles.geo}> {geo.location}</span>
        ) : (
          <span className={styles.geoMuted}>
            {geo.error ? `Geo: ${geo.error}` : "Detecting location…"}
          </span>
        )}
      </div>
    </div>
  );
}
