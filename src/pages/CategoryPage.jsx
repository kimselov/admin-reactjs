import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  // Fetch categories on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch categories', error);
      });
  };


//   handleAddCategory 
const handleAddCategory = (e) => {
    e.preventDefault();
  
    axios.post('http://127.0.0.1:8000/api/categories', {
      name,
      slug
    })
    .then(response => {
      console.log('Category added:', response.data);
      fetchCategories(); // refresh list
      setName('');
      setSlug('');
    //   id of the form and reset it 
      document.getElementById('addCategoryForm').reset();
  
      // Close the modal
      const modalEl = document.getElementById('categoryModal');
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      console.log(modal);
      modal.hide();
  
      // ⚠️ Remove stuck backdrop manually
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
  
    //   // Also remove "modal-open" class from body
      document.body.classList.remove('modal-open');  // to allow us to scroll the page 
      document.body.style = ''; // Reset any inline styles (like overflow)
    })
    .catch(error => {
      console.error('Error adding category:', error);
    });
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Category List</h4>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryModal">
          Add Category
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <button className="btn btn-sm btn-info me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Category */}
      <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="addCategoryForm" onSubmit={handleAddCategory}>
              <div className="modal-header">
                <h5 className="modal-title" id="categoryModalLabel">Add Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Category Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">Slug</label>
                  <input type="text" className="form-control" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
