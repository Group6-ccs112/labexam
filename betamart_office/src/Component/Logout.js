import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Button variant="light" onClick={handleLogout}>Logout</Button>
  );
};

export default Logout;
