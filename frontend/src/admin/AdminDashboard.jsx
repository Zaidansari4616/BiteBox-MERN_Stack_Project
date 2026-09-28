import React, { useEffect, useState } from "react";
import AddFood from "./AddFood";
import EditFood from "./EditFood";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showAddFood, setShowAddFood] = useState(false);
  const [activeSection, setActiveSection] = useState("food");
  const [orders, setOrders] = useState([]);

  // FETCH FOODS
  useEffect(() => {
    fetch("http://localhost:5000/api/foods", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  // FETCH ALL ORDERS FOR ADMIN
  useEffect(() => {
    fetch("http://localhost:5000/api/orders/admin", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Orders fetch error:", err));
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
      const filtered = prevFoods.filter((food) => food._id !== updatedFood._id);
      return [...filtered, updatedFood];
    });
  };

  // UPDATE ORDER STATUS
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? data : order)),
      );
    } catch (error) {
      console.error("Order status update error:", error);
      alert(error.message);
    }
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

      <div className="admin-section-buttons">
        <button
          className={activeSection === "food" ? "active-section-btn" : ""}
          onClick={() => setActiveSection("food")}
        >
          Food Management
        </button>

        <button
          className={activeSection === "orders" ? "active-section-btn" : ""}
          onClick={() => setActiveSection("orders")}
        >
          Orders
        </button>
      </div>

      {activeSection === "food" && (
        <>
          <button className="add-food-btn" onClick={() => setShowAddFood(true)}>
            + Add Food Item
          </button>

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
        </>
      )}

      {activeSection === "orders" && (
        <div className="admin-orders-section">
          <h2>Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="admin-order-card">
                <div className="admin-order-info">
                  <h3>Order ID: {order.orderId}</h3>

                  <p>
                    <strong>Customer:</strong> {order.user?.name || "Unknown"}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.user?.email || "Unknown"}
                  </p>

                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>

                  <p>
                    <strong>Placed:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="admin-order-status">
                  <label>Status</label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedFood && (
        <EditFood
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onUpdate={updateFoodInList}
        />
      )}

      {showAddFood && (
        <AddFood
          categories={Object.keys(groupedFoods)}
          onClose={() => setShowAddFood(false)}
          onAdd={(newFood) => {
            setFoods((prevFoods) => [...prevFoods, newFood]);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
