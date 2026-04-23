import React, { useState, useEffect, useRef } from 'react';
import './food.css';
import PetOwnerNavbar from "../../components/navbar/PetOwnerNavbar";
import foodData from "../../data/Food.json";

const Food = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    setProducts(foodData);
    setFilteredProducts(foodData);
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
      <section className="food-hero-section d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="food-hero-heading">Cat/Dog Food</h1>
        </div>
      </section>

      <div className="food-container">
        <div className="food-controls">
          <div className="food-search">
            <CoolInput 
              label="Search products..."
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="food-sort">
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

        <div className="food-pet-types">
          <h3 className="food-filter-title">Filter by Pet Type:</h3>
          <br />
          <div className="food-pet-type-buttons">
            {petTypes.map(type => (
              <button
                key={type}
                className={`food-pet-type-btn ${selectedPetType === type ? 'active' : ''}`}
                onClick={() => setSelectedPetType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="food-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`food-category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="food-grid">
          {filteredProducts.map((product, index) => (
            <HoverCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="food-empty">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </>
  );
};

const CoolInput = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="food-coolinput">
      <label htmlFor="input" className="text">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        name="input" 
        className="food-input" 
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const CoolSelect = ({ label, value, onChange, options }) => {
  return (
    <div className="food-coolselect">
      <label htmlFor="select" className="food-text">{label}</label>
      <select 
        id="select"
        className="food-select" 
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
};

const HoverCard = ({ product, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
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
      className={`food-custom-card ${isVisible ? `animate-in ${side}` : 'animate-out'}`}
    >
      <div className="food-custom-card-content">
        <div
          className="food-custom-card-image"
          style={{ backgroundImage: `url(${product.bgImage})` }}
        >
          <div className="food-custom-card-overlay">
            <h3 className="food-custom-card-title">{product.name}</h3>
            <p className="food-custom-card-description">{product.description}</p>
            <p className="food-custom-card-price">{product.price}</p>
            <button className="food-custom-card-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
