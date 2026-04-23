import React, { useState, useEffect, useRef } from 'react';
import './Bedding.css';
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import beddingData from '../../data/Bedding.json';

const Bedding = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    setProducts(beddingData);
    setFilteredProducts(beddingData);
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
      result = [...result].sort((a, b) => parseFloat(a.price.replace('$','')) - parseFloat(b.price.replace('$','')));
    } else if (sortOption === 'priceHighLow') {
      result = [...result].sort((a, b) => parseFloat(b.price.replace('$','')) - parseFloat(a.price.replace('$','')));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedPetType, sortOption, products]);

  const categories = []; 
  const petTypes = ['All', 'Dog', 'Cat'];

  return (
    <>
      <PetOwnerNavbar />

      <section className="bedding-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="bedding-hero-heading">Bedding & Apparel</h1>
        </div>
      </section>

      <div className="bedding-container">
         
        <div className="bedding-controls">
          <div className="bedding-search">
            <CoolInput
              label="Search products..."
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bedding-sort">
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

        <div className="bedding-pet-types">
          <h3 className="bedding-filter-title">Filter by Pet Type:</h3>
          <div className="bedding-pet-type-buttons">
            {petTypes.map(type => (
              <button
                key={type}
                className={`bedding-pet-type-btn ${selectedPetType === type ? 'active' : ''}`}
                onClick={() => setSelectedPetType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="bedding-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`bedding-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bedding-grid">
          {filteredProducts.map((product, index) => (
            <HoverCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bedding-empty">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </>
  );
};

const CoolInput = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div className="bedding-coolinput">
    <label className="text">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="bedding-input"
      value={value}
      onChange={onChange}
    />
  </div>
);

const CoolSelect = ({ label, value, onChange, options }) => (
  <div className="bedding-coolselect">
    <label className="bedding-text">{label}</label>
    <select className="bedding-select" value={value} onChange={onChange}>
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
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={cardRef}
      className={`bedding-custom-card ${isVisible ? `animate-in ${side}` : 'animate-out'}`}
    >
      <div className="bedding-custom-card-content">
        <div className="bedding-custom-card-image" style={{ backgroundImage: `url(${product.bgImage})` }}>
          <div className="bedding-custom-card-overlay">
            <h3 className="bedding-custom-card-title">{product.name}</h3>
            <p className="bedding-custom-card-description">{product.description}</p>
            <p className="bedding-custom-card-price">{product.price}</p>
            <button className="bedding-custom-card-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bedding;
