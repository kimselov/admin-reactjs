import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, isLoggedIn } from '../auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span className="navbar-brand">My App</span>
      {isLoggedIn() && (
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
