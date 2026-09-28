import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { sendOrderConfirmation, isEmailConfigured } from "../../utils/emailService";

function PlaceOrder() {
  const { getTotalCart, clearCart, food_list, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, email, street, city, state, pincode, country, phone } = formData;
    
    // Validate all fields
    if (!firstName || !lastName || !email || !street || !city || !state || !pincode || !country || !phone) {
      alert("❌ Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address");
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("❌ Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);

    // Prepare order data
    const orderTotal = getTotalCart() + 50;
    const orderItems = Object.keys(cartItems).map(id => {
      const item = food_list.find(f => f._id === id);
      return `${item.name} x${cartItems[id]} = ₹${item.price * cartItems[id]}`;
    }).join('\n');

        const orderData = {
      ...formData,
      total: orderTotal,
      items: orderItems,
    };

    try {
      // Save order to MongoDB
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: cartItems,
          totalAmount: orderTotal,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Order could not be placed");
      }

      orderData.order_id = result.orderId;

      // Check if email is configured
      if (isEmailConfigured()) {
        try {
          await sendOrderConfirmation(orderData);

          alert(
            `✅ Order placed successfully!\n\n` +
            `🆔 Order ID: ${result.orderId}\n` +
            `💰 Total: ₹${orderTotal}\n` +
            `📧 Confirmation email sent to ${email}\n\n` +
            `Check your inbox!`
          );
        } catch (emailError) {
          console.error("Email confirmation failed:", emailError);

          alert(
            `✅ Order placed successfully!\n\n` +
            `🆔 Order ID: ${result._id}\n` +
            `💰 Total: ₹${orderTotal}\n\n` +
            `⚠️ Email confirmation failed to send.`
          );
        }
      } else {
        console.warn("⚠️ EmailJS not configured. Skipping email send.");

        alert(
          `✅ Order placed successfully!\n\n` +
          `🆔 Order ID: ${result._id}\n` +
          `💰 Total: ₹${orderTotal}\n\n` +
          `⚠️ Email service not configured.`
        );
      }

      // Clear cart and redirect
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Order placement error:", error);

      alert(
        `❌ Order could not be placed.\n\n` +
        `${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            maxLength="6"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          maxLength="10"
          pattern="[0-9]{10}"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCart()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCart() === 0 ? 0 : 50}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCart() === 0 ? 0 : getTotalCart() + 50}</b>
          </div>
          <button type="submit" disabled={isSubmitting || getTotalCart() === 0}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span> PROCESSING...
              </>
            ) : (
              "PROCEED TO PAYMENT"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;