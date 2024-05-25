// App.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Product from "./Component/Product";
import User from "./Component/User";
import Login from "./Component/Login";
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'User1', email: 'user1@example.com', password: 'password1' },
    { id: 2, name: 'User2', email: 'user2@example.com', password: 'password2' },
    { id: 3, name: 'User3', email: 'user3@example.com', password: 'password3' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description for Product 3' },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

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
