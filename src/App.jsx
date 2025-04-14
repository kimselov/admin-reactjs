// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./index.css";
import Category from './pages/CategoryPage';
function App() {
  return (
    <Router>
    <div id="app">
      <div className="main-wrapper d-flex">
        <Sidebar />
        <div className="main-content-wrapper flex-grow-1">
          <div className="navbar-bg"></div>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  
  );
}

export default App;
