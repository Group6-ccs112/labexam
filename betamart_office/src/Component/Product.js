import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editing) {
      setCurrentProduct({ ...currentProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, newProduct]);
      console.log(data);
      setNewProduct({ name: '', price: '', description: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };  

  const editProduct = (product) => {
    setEditing(true);
    setCurrentProduct(product);
  };

  const updateProduct = () => {
    fetch(`http://127.0.0.1:8000/api/products/${currentProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentProduct),
    })
    .then(response => response.json())
    .then(data => {
      setProducts(products.map(product => (product.id === currentProduct.id ? currentProduct : product)));
      setEditing(false);
      setCurrentProduct({ id: null, name: '', price: '', description: '' });
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const deleteProduct = (id) => {
    fetch(`http://127.0.0.1:8000/api/removeProduct/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== id));
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-4 mb-5 text-center">Apparel Product Management</h1>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <h2 className="text-center">{editing ? 'Edit Product' : 'Add Product'}</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              editing ? updateProduct() : addProduct();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={editing ? currentProduct.name : newProduct.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="price"
                value={editing ? currentProduct.price : newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="description"
                value={editing ? currentProduct.description : newProduct.description}
                onChange={handleInputChange}
                placeholder="Description"
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
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm mr-2 me-2"
                        onClick={() => editProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(product.id)}
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

export default Product;
