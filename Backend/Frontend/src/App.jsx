 import React from 'react'
import Category from './Pages/Category'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Subcategory from './Pages/Category/subcategory'
import Product from './Pages/product'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import Register from './Pages/register'
import Login from './Pages/login'
 
 function App() {
  
   return (
     <>
     <BrowserRouter>
     <Routes>
       <Route path='/category' element={<Category/>}></Route>
       <Route path='/subcategory' element={<Subcategory/>}></Route>
       <Route path='/product' element={<Product/>}></Route>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/register' element={<Register/>}></Route>
       <Route path='/login' element={<Login/>}></Route> 
     </Routes>
     </BrowserRouter>
     </>
   )
 }
 
 export default App
 