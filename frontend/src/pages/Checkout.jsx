import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, getTotalCart, clearCart } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const placeOrder = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        items: cartItems,
        totalAmount: getTotalCart(),
      }),
    });

    if (res.ok) {
      clearCart();
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      alert("Order failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>
      <p>Total Amount: ₹{getTotalCart()}</p>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
