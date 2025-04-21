import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import Category from './pages/CategoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Brand from './pages/BrandPage';
import Product from './pages/ProductPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path='/brand'  element={<ProtectedRoute> <Brand/> </ProtectedRoute>}  > </Route>
            <Route path='/product'  element={<ProtectedRoute> <Product/> </ProtectedRoute>}  > </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
