import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Order ID: {order.orderId}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
