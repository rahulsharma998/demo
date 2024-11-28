import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import Product from './Pages/Product';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/products' element={<Product/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App

