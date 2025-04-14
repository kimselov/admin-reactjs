// components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg main-navbar">
      <form className="form-inline mr-auto">
        <ul className="navbar-nav mr-3">
          <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
        </ul>
      </form>
      <ul className="navbar-nav navbar-right justify-content-end rightsidetop">
        <li className="nav-link">
          <a href="#" target="_blank" className="btn btn-warning">Front End</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img alt="user" src="uploads/user.jpg" className="rounded-circle-custom" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="profile.html"><i className="far fa-user"></i> Edit Profile</a></li>
            <li><a className="dropdown-item" href="login.html"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

