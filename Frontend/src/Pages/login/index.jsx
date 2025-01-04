 import React, { useState } from 'react'
 import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom'
 function Login() {
   const[uname,setuname]=useState("")
     const[email,setemail]=useState("")
   
   const[userData,setuserData]=useState([])
   const nextPage=useNavigate()
   const userRecord=async()=>{
     const re=await fetch("http://localhost:3000/api/v1/register",{
       method:"get",
       headers:{"content-type":"application/json"},
     })
     const data=await re.json()
     console.log(data)
     await setuserData(data)
     const user=userData.filter((item)=>item.email==email)
     console.log(user)
  //   if(user){
  // nextPage("/")
  // console.log(user)

  //   }
  //   else{
  //     alert("invalid user")
  //     nextPage("/login")
  //   }
   }
   return (
     <>
       <div className={styles.registerCont}>
         <div className={styles.registerBody}>
             
            <h1></h1>
          <div className={styles.register}> customer Login form  </div>
          <div className={styles.inputCont}>
           <p>user name</p>
           <input type='text' placeholder='enter user name' onChange={(e)=>setuname(e.target.value)}/>
           {
             uname.length<6?
           <span className={styles.error}>user name must be atleast 6 character</span>
           :""
           }
          </div>
          
          <div className={styles.inputCont}>
                   <p>email</p>
                   <input type='text' placeholder='enter email'  onChange={(e)=>setemail(e.target.value)}/>
                   {
                    email.includes("@")&&email.includes(".com")?
                   ""
                   :<span className={styles.error}>email must be valid</span>
                   }
                  </div>
           
          <div className={styles.inputCont}>
           <button onClick={userRecord}>login</button>
          </div>
          
         </div>
       </div>
     </>
   )
 }
 
 export default Login
 