import React, { useEffect, useState } from "react";
import EditFood from "./EditFood";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  // FETCH FOODS
  useEffect(() => {
    fetch("http://localhost:5000/api/foods", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  // DELETE FOOD
  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    await fetch(`http://localhost:5000/api/foods/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setFoods((prev) => prev.filter((food) => food._id !== id));
  };

  // UPDATE FOOD IN STATE (IMPORTANT)
  const updateFoodInList = (updatedFood) => {
    setFoods((prevFoods) => {
      const filtered = prevFoods.filter(
        (food) => food._id !== updatedFood._id
      );
      return [...filtered, updatedFood];
    });
  };

  // GROUP FOODS BY CATEGORY
  const groupedFoods = foods.reduce((acc, food) => {
    const category = food.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(food);
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel – Food Management</h2>

      {Object.keys(groupedFoods).map((category) => (
        <div key={category} className="admin-category">
          <h3 className="admin-category-title">{category}</h3>

          {groupedFoods[category].map((food) => (
            <div key={food._id} className="admin-food-card">
              <div className="admin-food-left">
                <img
                  src={food.image}
                  alt={food.name}
                  className="admin-food-img"
                />

                <div className="admin-food-info">
                  <strong>{food.name}</strong>
                  <p>₹{food.price}</p>
                </div>
              </div>

              <div className="admin-food-actions">
                <button
                  className="edit-btn"
                  onClick={() => setSelectedFood(food)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteFood(food._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {selectedFood && (
        <EditFood
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onUpdate={updateFoodInList}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
