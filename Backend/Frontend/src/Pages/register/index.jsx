import React, { useState } from 'react'
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom'
function Register() {
  const[uname,setuname]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[cPassword,setcPassword]=useState("")
  const next=useNavigate()
  const userRecord=async()=>{
   
    if( uname.length<6|| email.includes("@")&&email.includes(".com")|| (password!=cPassword||password.length!=cPassword.length)){

      const re=await fetch("http://localhost:3000/api/v1/register",{
        method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({uname:uname,email:email,password:password,cPassword:cPassword})
      })
      const data=await re.json()
      alert(data.msg)
      next("/login")
    }
    else{

      alert("please enter correct details")
     

    }
  }
  const navigate=useNavigate()
  const goToLogin=()=>{
navigate("/login")
  }
  return (
    <>
      <div className={styles.registerCont}>
        <div className={styles.registerBody}>
         <div className={styles.register}> Customer form</div>
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
          <p>password</p>
          <input type='text' placeholder='enter password' onChange={(e)=>setpassword(e.target.value)}/>
          {
            password.length<6?
          <span className={styles.error}>password must be atleast 6 character</span>
          :""
          }
         </div>
         <div className={styles.inputCont}>
          <p>confirm password</p>
          <input type='text' placeholder='enter confirm password'  onChange={(e)=>setcPassword(e.target.value)}/>
          {
           ( password!=cPassword||password.length!=cPassword.length)?
          <span className={styles.error}>password should be matched</span>
          :""
          }
         </div>
         <div className={styles.inputCont}>
          <button onClick={userRecord}>create user</button>
         </div>
         <div className={styles.inputCont}>
     <div className={styles.account}>Already Have An Account ?  <span onClick={goToLogin}>login</span></div>
         </div>
        </div>
      </div>
    </>
  )
}

export default Register
