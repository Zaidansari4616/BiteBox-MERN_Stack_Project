import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../Loader/Loader";

function FoodDisplay({ category }) {
  const { food_list, loading, error, searchTerm } = useContext(StoreContext);

  // Show loading state with new Loader component
  if (loading) {
    return (
      <div className="food-display">
        <Loader message="Loading delicious food..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="food-display">
        <div className="error-container">
          <i className="bi bi-exclamation-triangle"></i>
          <p>Error loading food items: {error}</p>
          <p>Using cached data instead.</p>
        </div>
      </div>
    );
  }

  // Filter food items by category AND search term
 const filteredFood = food_list.filter((item) => {
  const matchesCategory =
    category === "All" || category === item.category;

  const matchesSearch =
    searchTerm === "" ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});


  // Show empty state if no results
  if (filteredFood.length === 0) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top Dishes For You</h2>
        {searchTerm && (
          <p className="search-results-info">
            Searching for: <strong>"{searchTerm}"</strong>
          </p>
        )}
        <div className="empty-container">
          <i className="bi bi-inbox"></i>
          <h3>No food items found</h3>
          <p>
            {searchTerm 
              ? `No results for "${searchTerm}" in ${category === "All" ? "all categories" : category}`
              : `No items in this category`}
          </p>
          {searchTerm && (
            <button className="clear-search" onClick={() => window.location.reload()}>
              Clear Search
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes For You</h2>
      {searchTerm && (
        <p className="search-results-info">
          Found <strong>{filteredFood.length}</strong> result{filteredFood.length !== 1 ? 's' : ''} for <strong>"{searchTerm}"</strong>
        </p>
      )}
      <div className="food-display-list">
        {filteredFood.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;