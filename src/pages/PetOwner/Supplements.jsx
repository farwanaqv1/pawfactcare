import React, { useState, useEffect, useRef } from 'react';
import './Supplements.css';
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import supplementsData from "../../data/Supplements.json"; 

const Supplements = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    setProducts(supplementsData);
    setFilteredProducts(supplementsData);
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
      result = [...result].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortOption === 'priceHighLow') {
      result = [...result].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedPetType, sortOption, products]);

  const categories = [];
  const petTypes = ['All', 'Dog', 'Cat'];

  return (
    <>
      <PetOwnerNavbar />
      <section className="supplements-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="supplements-hero-heading">Health Supplements</h1>
        </div>
      </section>

      <div className="supplements-container">
        <div className="supplements-controls">
          <div className="supplements-search">
            <CoolInput 
              label="Search products..."
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="supplements-sort">
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

        <div className="supplements-pet-types">
          <h3 className="supplements-filter-title">Filter by Pet Type:</h3>
          <div className="supplements-pet-type-buttons">
            {petTypes.map(type => (
              <button
                key={type}
                className={`supplements-pet-type-btn ${selectedPetType === type ? 'active' : ''}`}
                onClick={() => setSelectedPetType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="supplements-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`supplements-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="supplements-grid">
          {filteredProducts.map((product, index) => (
            <HoverCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="supplements-empty">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </>
  );
};

const CoolInput = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div className="supplements-coolinput">
    <label htmlFor="input" className="text">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      name="input" 
      className="supplements-input" 
      value={value}
      onChange={onChange}
    />
  </div>
);

const CoolSelect = ({ label, value, onChange, options }) => (
  <div className="supplements-coolselect">
    <label htmlFor="select" className="supplements-text">{label}</label>
    <select 
      id="select"
      className="supplements-select" 
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const HoverCard = ({ product, index }) => {
  const cardRef = React.useRef(null);
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
      className={`supplements-custom-card ${isVisible ? `animate-in ${side}` : 'animate-out'}`}
    >
      <div className="supplements-custom-card-content">
        <div className="supplements-custom-card-image" style={{ backgroundImage: `url(${product.bgImage})` }}>
          <div className="supplements-custom-card-overlay">
            <h3 className="supplements-custom-card-title">{product.name}</h3>
            <p className="supplements-custom-card-description">{product.description}</p>
            <p className="supplements-custom-card-price">{product.price}</p>
            <button className="supplements-custom-card-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplements;
