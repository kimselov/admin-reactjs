import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { getToken } from '../auth';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
const Brand = () => {
   const [brands,setBrands] = useState([]);

   //State for Add Brand 
   const [logo,setLogo] = useState(null);
   const [name,setName] = useState("");
   const [slug,setSlug] = useState("");
   const [description,setDescription] = useState("");

   //State for edit brand 
   const [editId,setEditId] = useState(null);
   const [editName,setEditName] = useState("");
   const [editSlug,setEditSlug] = useState("");
   const [editDescription,setEditDescription] = useState("");
   const [editLogo,setEditLogo] = useState(null);
   useEffect(() => {
     fetchBrands();
   },[]);
   //fetch brand code
   const fetchBrands = () => {
      const token = localStorage.getItem("token");
       axios.get("http://127.0.0.1:8000/api/brands",{
           headers: {
              Authorization: `Bearer ${token} `
           }, 
       }).then(response => {
            setBrands(response.data.data); 
       }).catch(error => {
         console.log(error);
       });
   }

    // handle Add brand 
   const handleAddbrand = (e) => {
        e.preventDefault();
        const token = getToken();
        console.log(token);
        axios.post("http://127.0.0.1:8000/api/brands",{
            logo,
            name,
            slug,
            description
        },{
             headers: {
                 "Content-Type" : "multipart/form-data",
                 Authorization: `Bearer ${token}`
             }
        }).then(response => {
            Swal.fire("Success","Brand Created Successfully","success");
             fetchBrands();
             setLogo(null);
             setName("");
             setSlug("");
             setDescription("");
             document.querySelector("#addBrandForm").reset();

             //Close Modal
             const modalEl = document.querySelector("#brandModal");
             const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
             modal.hide();

             //clear backdrop 
            //  const backdrop = document.querySelector(".modal-backdrop");
            //  if(backdrop){
            //     backdrop.remove();
            //  }

            //  //allow user to scroll the page again
            //  document.body.classList.remove("modal-open");
            //  document.body.style.overflow = "auto";

            setTimeout(() => {
                const backdrop = document.querySelector(".modal-backdrop");
                if (backdrop) backdrop.remove();
          
                document.body.classList.remove("modal-open");
                document.body.style.overflow = "auto"; // Allow scroll again
              }, 500); // Wait for Bootstrap animation (0.5s)
        });

   }

   const openEditModal = (brand) => {
      setEditId(brand.id);
      setEditName(brand.name);
      setEditSlug(brand.slug);
      setEditDescription(brand.description);
      setEditLogo(brand.logo);

      const modalEl = document.querySelector("#editBrandModal");
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.show();
   }

   const handleUpdateCategory = (e) => {
        e.preventDefault();
        const token = getToken();
        axios.post(`http://127.0.0.1:8000/api/brands/${editId}?_method=PUT`,{
            logo : editLogo,
            name: editName,
            slug: editSlug,
            description: editDescription,
       },{
           headers : {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token} `
         }
           }
        ).then(response => {
          Swal.fire("Success","Brand Updated Successfully","success");
          fetchBrands();
          setEditName("");
          setEditLogo(null);
          setEditSlug("");
          setEditDescription("");
          document.getElementById("editBrandForm").reset();
          
          //close modal 
          const modalEl = document.querySelector("#editBrandModal");
          const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
          modal.hide();

          //remove backdrop
          const backdrop = document.querySelector(".modal-backdrop");
          if(backdrop){
             backdrop.remove();
          }

          setTimeout(() => {
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
      
            document.body.classList.remove("modal-open");
            document.body.style.overflow = "auto"; // Allow scroll again
          }, 500); // Wait for Bootstrap animation (0.5s)



       });
   }


   const handleDeleteBrand = (id) => {
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
        axios.delete(`http://127.0.0.1:8000/api/brands/${id}`,{
          headers: {
             "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        })
          .then(() => {
            fetchBrands();
            Swal.fire('Deleted!', 'Brand has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Delete failed', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
   }






  return (
    <div className='container mt-4' >
           <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Brand List</h4>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#brandModal">
          Add Brand
        </button>
      </div>


         <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {brands.map(brand => {
                return <tr key={brand.id} >  
                     <td> {brand.id} </td>
                     <td>
                        <img width="50px" height="50px"  src={`http://127.0.0.1:8000/${brand.logo}`} alt={`${brand.name}`} />
                     </td>
                    <td>
                        {brand.name}
                    </td>
                    <td>{brand.description}</td>
                    <td>
                    <button className="btn btn-sm btn-info me-2"  onClick={() => openEditModal(brand)} >Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBrand(brand.id)} >Delete</button>
                    </td>
                  
                 </tr>
            })}
        </tbody>
      </table>


             {/* ADD Modal Brand */}
      <div className="modal fade" id="brandModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="addBrandForm" onSubmit={handleAddbrand} >
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                 <input type="file" className='form-control mb-3' onChange={(e) => setLogo(e.target.files[0])}  />
                <input type="text" className="form-control mb-3" placeholder="Brand Name"  value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="form-control mb-3 " placeholder="Brand Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                <input type="text" className='form-control' placeholder='Brand Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" >Add</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

       {/* EDIT Modal Form  */}
       <div className="modal fade" id="editBrandModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form  onSubmit={handleUpdateCategory}  id='editBrandForm' >
              <div className="modal-header">
                <h5 className="modal-title">Edit Brand</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
              <input type="file" className='form-control mb-3' onChange={(e) => setEditLogo(e.target.files[0])}  />
               <img width="50px" height="50px"  src={`http://127.0.0.1:8000/${editLogo}`} alt="" />
                <input type="text" className="form-control mb-3" placeholder="Brand Name"  value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="text" className="form-control mb-3 " placeholder="Brand Slug" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} />
                <input type="text" className='form-control' placeholder='Brand Description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success"  >Update</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Brand