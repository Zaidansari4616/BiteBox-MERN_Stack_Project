import React, { useState } from "react";
import "./EditFood.css";

const EditFood = ({ food, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: food.name || "",
    price: food.price || "",
    category: food.category || "",
    image: food.image || "",
    description: food.description || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Name, price and category are required");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/foods/${food._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    const updatedFood = await res.json();

    if (!res.ok) {
      alert(updatedFood.message || "Update failed");
      return;
    }

    onUpdate(updatedFood);
    onClose();
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h2>Edit Food</h2>
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food name"
            required
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image path"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <div className="admin-modal-actions">
            <button type="submit">Save</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
