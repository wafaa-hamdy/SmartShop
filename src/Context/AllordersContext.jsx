import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AllOrdersContext = createContext();

// Function to decode JWT token and get userId
function getUserIdFromToken(token) {
  if (!token) return null;
  
  try {
    // JWT has 3 parts separated by dots: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    return decoded.id; // The userId is in the 'id' field
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function AllOrdersProvider({ children }) {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchAllOrders() {
    const token = localStorage.getItem("UserToken");
    if (!token) {
      console.warn("No user token found in localStorage, skipping fetchAllOrders");
      setAllOrders([]);
      return;
    }
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/orders/", {
        headers: { token },
      })
      .then((response) => {
        console.log("All Orders:", response.data);
        setAllOrders(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchUserOrders(userId) {
    const token = localStorage.getItem("UserToken");
    if (!token || !userId) {
      console.warn("No token or userId found, skipping fetchUserOrders");
      setUserOrders([]);
      return;
    }

    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: { token },
      })
      .then((response) => {
        setUserOrders(response.data || []);
        console.log("User Orders:", response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadUserOrders();
  }, []);

  function loadUserOrders() {
    const token = localStorage.getItem("UserToken");
    
    if (token) {
      // Try to get userId from localStorage first
      let userId = localStorage.getItem("UserId");
      
      // If not found, decode it from the token
      if (!userId) {
        userId = getUserIdFromToken(token);
        
        // Save it to localStorage for future use
        if (userId) {
          localStorage.setItem("UserId", userId);
          console.log("✅ UserId extracted from token and saved:", userId);
        }
      }
      
      console.log("UserId from localStorage:", userId);
      console.log("Token from localStorage:", token);
      
      if (userId) {
        fetchUserOrders(userId);
      } else {
        console.warn("❌ Could not extract userId from token");
      }
    }
  }

  return (
    <AllOrdersContext.Provider
      value={{ allOrders, userOrders, loading, fetchAllOrders, fetchUserOrders }}
    >
      {children}
    </AllOrdersContext.Provider>
  );
}

export function useAllOrders() {
  return useContext(AllOrdersContext);
}