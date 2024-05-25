import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ users, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.name === username && user.password === password);
    if (user) {
      const userData = {
        id: user.id,
        username: user.name.charAt(0).toUpperCase() + user.name.slice(1),
      };
      onLogin(userData);
      navigate("/"); // Navigate to the home page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 bg-info p-5 rounded">
        <h1 className="text-center my-4 text-white">LOGIN</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <br />
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
