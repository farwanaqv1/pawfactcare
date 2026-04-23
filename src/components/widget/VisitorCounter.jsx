import { useEffect, useState } from "react";
import styles from "./VisitorCounter.module.css";

export default function VisitorCounter() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const key = "pawfect_visits";
    const n = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, String(n));
    setCount(n);
  }, []);

  return <div className={styles.badge}>Visitor Count: {count}</div>;
}
