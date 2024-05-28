import React, { useState } from 'react';
import Navigation from "../Navigation.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const User = ({ users, setUsers, loggedInUser, setLoggedInUser }) => {
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const addUser = async () => {
    try {
      const existingUsername = users.find(user => user.username === currentUser.username);
      if (existingUsername) {
        throw new Error('Username is already taken');
      }
  
      const response = await fetch('http://127.0.0.1:8000/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });
  
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, currentUser]);
      console.log(data);
      clearInputs();
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };  

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = async () => {
    try {
      const currentPassword = window.prompt("Please enter your current password to confirm changes:");
    
      if (!currentPassword) {
        console.log("User cancelled password verification.");
        return;
      }
  
      const updatedUser = { ...currentUser };
      updatedUser.current_password = currentPassword; // Add current_password property
  
      const existingUsername = users.find(user => user.id !== updatedUser.id && user.username === updatedUser.username);
      if (existingUsername) {
        throw new Error('Username is already taken');
      }
  
      if (updatedUser.password === '') {
        delete updatedUser.password;
      }
  
      const response = await fetch(`http://127.0.0.1:8000/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Update successful
        alert("User updated successfully");
        setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
        if (loggedInUser.id === currentUser.id) {
          const userData = {
            id: currentUser.id,
            username: currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1),
          };
          setLoggedInUser(userData);
        }
        setEditing(false);
        clearInputs();
        console.log(data);
      } else {
        // Error occurred
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
      alert("Failed to update user. Please try again.");
    }
  };
  
  
  const deleteUser = (id) => {
    fetch(`http://127.0.0.1:8000/api/removeUser/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  const clearInputs = () => {
    setCurrentUser({ id: null, username: '', password: '' });
    const inputTags = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputTags.forEach(input => input.value = '');
  };

  const handleCancel = () => {
    setEditing(false);
    clearInputs();
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
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>
            <br></br>
            {!editing && (
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </div>
            )}
            <br />
            <button className="btn btn-secondary w-100 mb-2" onClick={() => handleCancel()}>
              Cancel
            </button>
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
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
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
