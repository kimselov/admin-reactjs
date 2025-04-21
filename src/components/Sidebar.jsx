// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="main-sidebar">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="index.html">Admin Panel</a>
        </div>
        <ul className="sidebar-menu">
        <li><Link to="/dashboard" className="nav-link"><i className="fas fa-hand-point-right"></i> <span>Dashboard</span></Link></li>
        {/* <li className="nav-item dropdown active">
            <a href="#" className="nav-link has-dropdown"><i className="fas fa-hand-point-right"></i><span>Dropdown Items</span></a>
            <ul className="dropdown-menu">
              <li className="active"><a className="nav-link" href=""><i className="fas fa-angle-right"></i> Item 1</a></li>
              <li><a className="nav-link" href=""><i className="fas fa-angle-right"></i> Item 2</a></li>
            </ul>
          </li> */}
          {/* <li><a className="nav-link" href="setting.html"><i className="fas fa-hand-point-right"></i> <span>Setting</span></a></li> */}
          {/* <li><a className="nav-link" href="form.html"><i className="fas fa-hand-point-right"></i> <span>Form</span></a></li> */}
          {/* <li><a className="nav-link" href="table.html"><i className="fas fa-hand-point-right"></i> <span>Table</span></a></li> */}
        <li><Link to="/category" className="nav-link"><i className="fas fa-hand-point-right"></i> <span>Category</span></Link></li>
        <li><Link to="/brand" className="nav-link"><i className="fas fa-hand-point-right"></i> <span>Brand</span></Link></li>
        <li><Link to="/product" className="nav-link"><i className="fas fa-hand-point-right"></i> <span>Product</span></Link></li>
          <li><a className="nav-link" href="invoice.html"><i className="fas fa-hand-point-right"></i> <span>Invoice</span></a></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
