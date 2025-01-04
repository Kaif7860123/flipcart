import React from 'react'
import styles from "./index.module.css"
import logo from '../../assets/logo.jpeg'
import { FaCartPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate=useNavigate()

  const goToRegister=()=>{
    navigate("/register")
  }
  return (
    <>
      
        <div className={styles.navHeader}>
            <div>
            <img src={logo}/>
            </div>
            <div className={styles.inpCont}>
                <i><FaSearch/></i>
            <input type='text' placeholder='Enter text'/>
            </div>
            <p onClick={goToRegister}><i><FaUserAlt/></i>register</p>
            
                <p><i><FaCartPlus/></i>Cart</p>
                <p>Logout</p>
                <p>view order</p>
           
        </div>
    
    </>
  )
}

export default Navbar
