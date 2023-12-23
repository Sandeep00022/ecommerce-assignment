import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import Products from '../pages/Products'
import CartPage from '../pages/CartPage'
import Navbar from '../components/Navbar'

const AllRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<AddProduct/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<CartPage/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes