import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./img/apparelLogo.png";
import Logout from './Component/Logout';

function Navigation({ user, onLogout }) {
  return (
    <>
      {user && (
        <header className="bg-info d-flex justify-content-between align-items-center">
          <Link to="/"><img width={100} src={logo} alt="Company Logo" className="m-3"/></Link>
          <nav className="d-flex justify-content-between align-items-center me-5 text-decoration-none">
            <ul className="list-unstyled text-decoration-none d-flex fs-2 fw-bold">
              <>
                <li className="me-3">Welcome, {user.user.username}</li>
                <li><Logout onLogout={onLogout} /></li>
              </>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default Navigation;
