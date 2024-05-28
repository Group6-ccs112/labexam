// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Product from "./Component/Product";
import User from "./Component/User";
import Login from "./Component/Login";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    fetch("http://127.0.0.1:8000/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));

    // Fetch products from the API
    fetch("http://127.0.0.1:8000/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []); // Empty dependency array to run the effect only once

  // Function to handle login
  const handleLogin = (userData) => {
    setLoggedInUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        <Navigation user={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Home user={loggedInUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login users={users} onLogin={handleLogin} />}
          />
          <Route
            path="/users"
            element={loggedInUser ? <User users={users} setUsers={setUsers} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={loggedInUser ? <Product products={products} setProducts={setProducts} user={loggedInUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
