import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart({ setShowLogin }) {
  const { cartItems, food_list, removeFromCart, getTotalCart, isLoggedIn } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const cartEmpty = getTotalCart() === 0;

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      {cartEmpty ? (
        <div className="cart-empty">
          <i className="bi bi-cart-x"></i>
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to get started!</p>
          <button onClick={() => navigate("/")} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="title cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item ">
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>Rs.{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>Rs.{item.price * cartItems[item._id]}</p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="trash-icon bi bi-trash"></i>
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs.{getTotalCart()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs.{getTotalCart() === 0 ? 0 : 50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs.{getTotalCart() === 0 ? 0 : getTotalCart() + 50}</b>
              </div>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowLogin(true);
                    return;
                  }
                  navigate("/order");
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
