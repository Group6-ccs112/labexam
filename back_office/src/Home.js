import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Home() {
  return (
    <div className="mt-5 container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-lg-8" style={{ animation: 'fadeIn 1s ease-in' }}>
          <h1 className="text-center">Welcome to Our Apparel Shop Management</h1>
          <p className="text-center fs-5" style={{ animation: 'slideIn 1s ease-in-out' }}>
            "
Welcome to our apparel shop! Here, you have the ability to manage various aspects of the website, including products and user accounts. Whether you're looking to add new items to our collection, update existing ones, or oversee user registrations and interactions, you're in the right place. Let's work together to optimize and enhance your online shopping experience."
          </p>
          <div className="text-center mt-5 mb-5 d-flex justify-content-center">
              <Link to="/users" className="btn btn-primary btn-lg border me-5" style={{ fontSize: "24px" }}>View Users</Link>
              <Link to="/products" className="btn btn-primary btn-lg border" style={{ fontSize: "24px" }}>View Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
