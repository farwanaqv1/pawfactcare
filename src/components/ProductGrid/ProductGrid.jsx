import { useEffect, useState } from "react";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

 
  useEffect(() => {
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

 
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pet Product Showcase</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.price}>{product.price}</p>
            <button className={styles.button}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
