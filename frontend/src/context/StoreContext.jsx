import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  /* AUTO LOGIN (COOKIE BASED) */
 useEffect(() => {
  fetch("http://localhost:5000/api/auth/me", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.message) {
        setCurrentUser(data);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    })
    .catch(() => {
      setCurrentUser(null);
      setIsLoggedIn(false);
    })
    .finally(() => {
      setAuthLoading(false);
    });
}, []);

  /* FETCH FOOD DATA*/
  useEffect(() => {
  const fetchFood = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/foods");

      if (!res.ok) {
        throw new Error("Failed to fetch foods");
      }

      const data = await res.json();
      setFoodList(data);
      setError(null);
    } catch (err) {
      console.error("Food fetch error:", err);
      setError("Failed to load food items");
    } finally {
      setLoading(false);
    }
  };

  fetchFood();
}, []);


  /*CART (UNCHANGED LOGIC)*/
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  /* AUTH FUNCTIONS*/

  // called after successful backend login
  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  // REAL LOGOUT (COOKIE CLEARED BY BACKEND)
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log("Logout failed");
    }

    setCurrentUser(null);
    setIsLoggedIn(false);
    setCartItems({});
  };

  const contextValue = {
    food_list,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCart,
    clearCart,
    isLoggedIn,
    authLoading,
    currentUser,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
