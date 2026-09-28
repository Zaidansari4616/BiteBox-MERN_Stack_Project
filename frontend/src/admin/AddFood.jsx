import React, { useState } from "react";
import "./EditFood.css";

const AddFood = ({ onClose, onAdd, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.image ||
      !formData.price ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          price: Number(formData.price),
          description: formData.description,
          category: formData.category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add food");
      }

      alert("Food added successfully!");

      onAdd(data);
      onClose();
    } catch (error) {
      console.error("Add food error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h2>Add Food Item</h2>

          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Food name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="admin-modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Food"}
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
