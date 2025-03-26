import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BrandList from './pages/BrandsList'
import CartBrands from './pages/BrandsCart'
import Router from './components/Router'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import {useDispatch} from 'react-redux';
import {userIn} from "./features/userSlice.js"
import AddProduct from './components/AddBrand'
import CartMini from './components/CartMini'
import { useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // כאשר הדף נטען, לבדוק אם יש משתמש מחובר ולהעביר אותו לדף המתאים
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      dispatch(userIn(storedUser));
    }
    navigate("/home");
  }, [dispatch]);
  return (
    <>
    {/* <AddProduct/> */}
    {/* <CartMini/> */}
      <NavBar />

      <SignIn />
      <Router />
    </>
  )
}

export default App
