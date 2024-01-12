import React, { useState, useEffect } from 'react';
import axios from '../components/axios';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    price: '',
    times_sold: '',
    productId: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('api.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('/product/addProduct.php', formData);
      fetchData();
      setShowAddModal(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        type: '',
        price: '',
        times_sold: '',
        productId: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      await axios.put(`/product/updateProduct.php`, formData);
      fetchData();
      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        type: '',
        price: '',
        times_sold: '',
        productId: '',
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const addModalOpen = () => {
    setFormData({
        name: '',
        description: '',
        category: '',
        type: '',
        price: '',
        times_sold: '',
        productId: '',
      });
    setShowAddModal(true);
  }
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  return (
    <main className="full-block">
        <div className='d-flex justify-content-between'>
      <h1 className='h2'>Product Table</h1>

<button className="btn btn-success" onClick={() => addModalOpen()}>
  Add Product
</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Price</th>
            <th>Times Sold</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idproduct}>
              <td>{product.idproduct}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.type}</td>
              <td>{product.price}</td>
              <td>{product.times_sold}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.idproduct)}>
                  Delete
                </button>
                <button className="btn btn-primary ml-2" onClick={() => openEditModal(product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <div className={`modal ${showAddModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showAddModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingProduct ? 'Edit Product' : 'Add Product'}</h5>
              <button type="button" className="close" onClick={() => setShowAddModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} />
                </div>

<div className="form-group">
  <label>Category:</label>
  <select className="form-control" name="category" value={formData.category} onChange={handleInputChange}>
    <option value="">Select Category</option>
    <option value="Women">Women</option>
    <option value="Men">Men</option>
  </select>
</div>

<div className="form-group">
  <label>Type:</label>
  <select className="form-control" name="type" value={formData.type} onChange={handleInputChange}>
    <option value="">Select Type</option>
    <option value="Shoes">Shoes</option>
    <option value="Jeans">Jeans</option>
    <option value="Accessories">Accessories</option>
  </select>
</div>
                <div className="form-group">
                  <label>Price:</label>
                  <input type="text" className="form-control" name="price" value={formData.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Times Sold:</label>
                  <input type="text" className="form-control" name="times_sold" value={formData.times_sold} onChange={handleInputChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Close
              </button>
              {editingProduct ? (
                <button type="button" className="btn btn-primary" onClick={handleEditProduct}>
                  Save Changes
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductTable;
