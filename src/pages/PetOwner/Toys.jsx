import React, { useState, useEffect, useRef } from 'react';
import './Toys.css';
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import toysData from "../../data/Toys.json";

const Toys = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    setProducts(toysData);
    setFilteredProducts(toysData);
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (selectedPetType !== 'All') {
      result = result.filter(product => product.petType === selectedPetType.toLowerCase());
    }

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'priceLowHigh') {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      });
    } else if (sortOption === 'priceHighLow') {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedPetType, sortOption, products]);

  const categories = [];
  const petTypes = ['All', 'Dog', 'Cat'];

  return (
    <>
      <PetOwnerNavbar />
      <section className="toys-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="toys-hero-heading">Toys & Apparel</h1>
        </div>
      </section>

      <div className="toys-container">
        <div className="toys-controls">
          <div className="toys-search">
            <CoolInput 
              label="Search products..."
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toys-sort">
            <CoolSelect 
              label="Sort by"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              options={[
                { value: "default", label: "Default Sorting" },
                { value: "priceLowHigh", label: "Price: Low to High" },
                { value: "priceHighLow", label: "Price: High to Low" }
              ]}
            />
          </div>
        </div>

        <div className="toys-pet-types">
          <h3 className="toys-filter-title">Filter by Pet Type:</h3>
          <br />
          <div className="toys-pet-type-buttons">
            {petTypes.map(type => (
              <button
                key={type}
                className={`toys-pet-type-btn ${selectedPetType === type ? 'active' : ''}`}
                onClick={() => setSelectedPetType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="toys-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`toys-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="toys-grid">
          {filteredProducts.map((product, index) => (
            <HoverCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="toys-empty">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </>
  );
};

const CoolInput = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div className="toys-coolinput">
    <label htmlFor="input" className="text">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      name="input" 
      className="toys-input" 
      value={value}
      onChange={onChange}
    />
  </div>
);

const CoolSelect = ({ label, value, onChange, options }) => (
  <div className="toys-coolselect">
    <label htmlFor="select" className="toys-text">{label}</label>
    <select 
      id="select"
      className="toys-select" 
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const HoverCard = ({ product, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={cardRef}
      className={`toys-custom-card ${isVisible ? `animate-in ${side}` : 'animate-out'}`}
    >
      <div className="toys-custom-card-content">
        <div
          className="toys-custom-card-image"
          style={{ backgroundImage: `url(${product.bgImage})` }}
        >
          <div className="toys-custom-card-overlay">
            <h3 className="toys-custom-card-title">{product.name}</h3>
            <p className="toys-custom-card-description">{product.description}</p>
            <p className="toys-custom-card-price">{product.price}</p>
            <button className="toys-custom-card-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toys;
