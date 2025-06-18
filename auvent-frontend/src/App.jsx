import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from './pages/Login';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import AddProduct from './pages/add-product';
import EditProduct from './pages/EditProduct';
import Wishlist from './pages/wishlist';
import Users from './pages/MangeUSers';
import AdminsTable from './pages/AdminsTable';
import AddAdmin from './pages/add-admins';
import EditAdmin from './pages/EditAdmin';
import CategoryPanel from './pages/Categeoryanal';
import AdminCategories from './pages/Categeoryanal';

 

function App() {
  return (
    <Router>
       <Navbar/>
      <Routes>
           <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login/>} />
           <Route path="/products" element={<Products/>} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="edit-product/:id/" element={<EditProduct/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/users" element={<Users/>} />
             <Route path="/admins" element={<AdminsTable/>} />
              <Route path="/add-admin" element={<AddAdmin/>} />
              <Route path="/edit-admin/:id" element={<EditAdmin/>} />
                   <Route path="/categories" element={<AdminCategories/>} />
           
      </Routes>
    </Router>
  );
}

export default App;
