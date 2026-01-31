import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./admin/AdminDashboard";

import { StoreContext } from "./context/StoreContext";

/* =========================
   ADMIN PROTECTED ROUTE
   ========================= */
const AdminRoute = ({ children }) => {
  const { isLoggedIn, currentUser } = useContext(StoreContext);

  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (currentUser?.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();


  /* ✅ FIX 2: Remove hash on refresh (no auto jump to menu) */
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />

          {/* 🔒 ADMIN ONLY */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
