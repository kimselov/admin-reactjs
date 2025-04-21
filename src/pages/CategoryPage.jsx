import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/api/categories',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCategories(res.data.data))
      .catch(err => console.error('Failed to fetch categories', err));
  };

  // ADD CATEGORY
  const handleAddCategory = (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/categories', { name, slug },{
       headers: {
         Authorization : `Bearer ${token}`
       }
    })
      .then(res => {
        fetchCategories();
        setName('');
        setSlug('');
        document.getElementById('addCategoryForm').reset();
        const modal = Modal.getInstance(document.getElementById('categoryModal'));
        modal.hide();
        cleanBackdrop();
      })
      .catch(err => console.error('Add failed', err));
  };

  // OPEN EDIT MODAL
  const openEditModal = (category) => {
    setEditId(category.id);
    setEditName(category.name);
    setEditSlug(category.slug);

     const modalEl = document.getElementById("editCategoryModal");
    const modal = new Modal(modalEl);
    modal.show();
  };

  // HANDLE UPDATE CATEGORY
  const handleUpdateCategory = (e) => {
    const token = localStorage.getItem('token'); 
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/categories/${editId}`, {
      name: editName,
      slug: editSlug
    },{
      headers : {
         Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        fetchCategories();
        const modalEl = document.getElementById('editCategoryModal');
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();
        cleanBackdrop();
      })
      .catch(err => console.error('Edit failed', err));
  };


  //handle delete feature
  const handleDeleteCategory = (id) => {
    const token = localStorage.getItem('token'); 
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:8000/api/categories/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(() => {
            fetchCategories();
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Delete failed', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  
  const cleanBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    document.body.classList.remove('modal-open'); //allow user to scroll
    document.body.style.overflow = 'auto';
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
                <button className="btn btn-sm btn-info me-2" onClick={() => openEditModal(cat)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCategory(cat.id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD Modal */}
      <div className="modal fade" id="categoryModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="addCategoryForm" onSubmit={handleAddCategory}>
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" className="form-control" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* EDIT Modal */}
      <div className="modal fade" id="editCategoryModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdateCategory}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                <input type="text" className="form-control" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} required />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Update</button>
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
