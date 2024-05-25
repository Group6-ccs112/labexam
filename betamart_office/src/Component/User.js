import React, { useState } from 'react';
import Navigation from "../Navigation.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const User = ({ users, setUsers, loggedInUser, setLoggedInUser }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editing) {
      setCurrentUser({ ...currentUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const addUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: '', email: '', password: '' });
  };

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

// Function to handle logout
const handleLogout = () => {
    setLoggedInUser(null);
    };

  const updateUser = () => {
    setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    if (loggedInUser.id === currentUser.id) {
        const userData = {
            id: currentUser.id,
            username: currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1),
        };
        setLoggedInUser(userData); // Update the loggedInUser state if it's the same user being edited
    }
    console.log(loggedInUser);
    setEditing(false);
    setCurrentUser({ id: null, name: '', email: '', password: '' });
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-4 mb-5 text-center">User Management</h1>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <h2 className="text-center">{editing ? 'Edit User' : 'Add User'}</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              editing ? updateUser() : addUser();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={editing ? currentUser.name : newUser.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                value={editing ? currentUser.email : newUser.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                value={editing ? currentUser.password : newUser.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <br />
            <button className="btn btn-success w-100" type="submit">
              {editing ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-7">
          <div className="table-responsive" style={{ maxHeight: '280px', overflowY: 'auto' }}>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm mr-2 me-2"
                        onClick={() => editUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
