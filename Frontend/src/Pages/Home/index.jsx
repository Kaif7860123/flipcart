import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import styles from "./index.module.css"
import image1 from '../../assets/image1.webp'
import image2 from '../../assets/image2.webp'
// import image3 from '../../assets/image3.webp'
import image4 from '../../assets/image4.webp'
function Home() {
    const[catData,setcatData]=useState([])
    useEffect(()=>{
        getcategoryData()
    },[])
  const getcategoryData=async()=>{
    const re=await fetch("http://localhost:3000/api/v1/category",{
        method:"get",
        headers:{"content-type":"application/json"}
    })
    const data= await re.json()
    setcatData(data)
  }
  return (
    <>
     <Navbar/>
     <div className={styles.homeBodyCont}>
     <div className={styles.categoryCont}>
      {
        catData.map((item,i)=>{
            return(
                <div className='text-center'>
                 <img src={'http://localhost:3000/'+item.categoryPic} className={styles.CategoryImg}/>
                 
                 <p>{item.categoryName}</p>
                 </div>
                
            )
        })
      }
     </div>
     <div className={styles.carouselCont}>

     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={image1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={image2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={image4} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
     </div>
     </div>
    </>
  )
}

export default Home
