import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* ✅ FIX HERE */}
        <img className="food-item-img" src={image} alt={name} />

        {!cartItems[id] ? (
          <button className="add-btn" onClick={() => addToCart(id)}>
            <i className="bi bi-plus"></i>
          </button>
        ) : (
          <div className="food-item-counter">
            <button onClick={() => removeFromCart(id)}>
              <i className="minus bi bi-dash-circle"></i>
            </button>
            <p>{cartItems[id]}</p>
            <button onClick={() => addToCart(id)}>
              <i className="plus bi bi-plus-circle"></i>
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs. {price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
