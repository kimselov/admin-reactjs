import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../auth";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [image, setImage] = useState(null);


  const [editId, setEditId] = useState(null);
const [editName, setEditName] = useState("");
const [editSlug, setEditSlug] = useState("");
const [editPrice, setEditPrice] = useState("");
const [editQuantity, setEditQuantity] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editProductType, setEditProductType] = useState("");
const [editCategoryId, setEditCategoryId] = useState(null);
const [editBrandId, setEditBrandId] = useState(null);
const [editImage, setEditImage] = useState(null);
const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = () => {
    const token = getToken();
    axios
      .get("http://127.0.0.1:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data.data));
  };

  const fetchCategories = () => {
    const token = getToken();
    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data.data));
  };

  const fetchBrands = () => {
    const token = getToken();
    axios
      .get("http://127.0.0.1:8000/api/brands", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBrands(res.data.data));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const token = getToken();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("product_type", productType);
    formData.append("category_id", categoryId);
    formData.append("brand_id", brandId);
    formData.append("image", image);

    axios
      .post("http://127.0.0.1:8000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire("Success", "Product Added Successfully", "success");
        fetchProducts();
        document.getElementById("addProductForm").reset();
        const modalEl = document.querySelector("#productModal");
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();

        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }

        setTimeout(() => {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "auto";
        }, 500);
      })
      .catch((err) => {
        console.log("Add failed", err);
        Swal.fire("Error", "Failed to add product", "error");
      });
  };


  const openEditModal = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditSlug(product.slug);
    setEditPrice(product.price);
    setEditQuantity(product.quantity);
    setEditDescription(product.description);
    setEditProductType(product.product_type);
    setEditCategoryId(product.category_id);
    setEditBrandId(product.brand_id);
    setPreviewImage(`http://127.0.0.1:8000/${product.image}`);
  
    const modalEl = document.getElementById("editProductModal");
    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
    modal.show();
  }


  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const token = getToken();
  
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("slug", editSlug);
    formData.append("price", editPrice);
    formData.append("quantity", editQuantity);
    formData.append("description", editDescription);
    formData.append("product_type", editProductType);
    formData.append("category_id", editCategoryId);
    formData.append("brand_id", editBrandId);
    if (editImage) formData.append("image", editImage);
    formData.append("_method", "PUT");
  
    axios
      .post(`http://127.0.0.1:8000/api/products/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire("Updated", "Product updated successfully", "success");
        fetchProducts();
  
        const modalEl = document.getElementById("editProductModal");
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();
      });
  };
  
  const handleDeleteProduct = (id) => {
    const token = getToken();
  
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire("Deleted", "Product has been deleted", "success");
            fetchProducts();
          });
      }
    });
  };
  

  return (
    <div className="container mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Product List</h4>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        >
          Add Product
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  width="50"
                  height="50"
                  src={`http://127.0.0.1:8000/${product.image}`}
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category?.name}</td>
              <td>{product.brand?.name}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => openEditModal(product) }  >Edit</button>
                <button className="btn btn-sm btn-danger"  onClick={() => handleDeleteProduct(product.id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="addProductForm" onSubmit={handleAddProduct}>
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Slug"
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  className="form-select mb-3"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  required
                >
                  <option value="">-- Select Product Type --</option>
                  <option value="featured_product">Featured Product</option>
                  <option value="best_selling_product">Best Selling Product</option>
                  <option value="hot_product">Hot Product</option>
                  <option value="new_arrival_product">New Arrival Product</option>
                </select>

                <select
                  className="form-control mb-2"
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control mb-2"
                  onChange={(e) => setBrandId(e.target.value)}
                  required
                >
                  <option value="">-- Select Brand --</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editProductModal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={handleUpdateProduct}>
        <div className="modal-header">
          <h5 className="modal-title">Edit Product</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" />
        </div>
        <div className="modal-body">
          <input type="file" className="form-control mb-2" onChange={(e) => setEditImage(e.target.files[0])} />
          {previewImage && <img src={previewImage} width="60" height="60" className="mb-2" alt="preview" />}
          <input type="text" className="form-control mb-2" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type="text" className="form-control mb-2" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} />
          <input type="number" className="form-control mb-2" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
          <input type="number" className="form-control mb-2" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />
          <input type="text" className="form-control mb-2" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <select className="form-control mb-2" value={editProductType} onChange={(e) => setEditProductType(e.target.value)}>
            <option value="">-- Select Type --</option>
            <option value="featured_product">Featured Product</option>
            <option value="best_selling_product">Best Selling Product</option>
            <option value="hot_product">Hot Product</option>
            <option value="new_arrival_product">New Arrival Product</option>
          </select>
          <select className="form-control mb-2" value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)}>
            <option value="">-- Select Category --</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select className="form-control mb-2" value={editBrandId} onChange={(e) => setEditBrandId(e.target.value)}>
            <option value="">-- Select Brand --</option>
            {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" type="submit">Update</button>
          <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
};

export default Product;
