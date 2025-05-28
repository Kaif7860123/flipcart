import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./index.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function Product() {
    const[catData,setcatData]=useState([])
    const[catId,setcatId]=useState()
    const[subcatid,setsubcatId]=useState()
    const[subcatData,setsubcatData]=useState([])
    const[pname,setpName]=useState()
    const[pname1,setpName1]=useState()
    const[pPic,setprodPic]=useState()
    const[price,setprice]=useState()
    const[price1,setprice1]=useState()
    const[offerprice,setofferprice]=useState()
    const[offerprice1,setofferprice1]=useState()
    const[desc,setdesc]=useState()
    const[desc1,setdesc1]=useState()
    const[productData,setproductData]=useState([])
    const[productId,setproductId]=useState()
    useEffect(()=>{
        getCategoryData()
        displayProduct()
        
    },[])
    const getCategoryData=async()=>{
        const re=await fetch("http://localhost:3000/api/v1/category",{
            method:"get",
            headers:{"content-type":"application/json"}
        })
        const data=await re.json()
        setcatData(data)
        // console.log(data.catName)
    }
    const getsubCatData=async(x)=>{
     alert(x)
    const re=await fetch("http://localhost:3000/api/v1/subcategory/" +x,{
        method:"get",
        headers:{"content-type":"application/json"}
    })
    const data=await re.json()
    // console.log(data)
    setsubcatData(data)
    setcatId(x)
    
    }
    const displayProduct=async(x="6763172ac21116c3b23fdf63")=>{
      const re=await fetch("http://localhost:3000/api/v1/product/detail/"+x,{
        method:"get",
        headers:{"content-type":"application/json"}
      })
      const data=await re.json()
      // console.log(data)
      setproductData(data)
      setsubcatId(x)
     }
    const recordSaved=async()=>{
      console.log(pPic)
          // console.log(catId,subcatid,pname,pPic,price,offerprice,desc)
          const fData=new FormData()
          fData.append("catid",catId)
          fData.append("subcatId",subcatid)
          fData.append("productName",pname)
          fData.append("productImg",pPic)
          fData.append("productPrice",price)
          fData.append("offerPrice",offerprice)
          fData.append("description",desc)
          const re=await fetch("http://localhost:3000/api/v1/product/detail",{
            method:"post",
            body:  fData
          })
          const data=await re.json()
          alert(data.msg)
          displayProduct(subcatid)

    }
  
   const recordDelete=async(m)=>{
    const re=await fetch("http://localhost:3000/api/v1/product/detail/",{
      method:"delete",
      headers:{"content-type":"application/json"}, 
      body:JSON.stringify({productId:m})   
     })
     const data=await re.json()
     alert(data.msg)
     displayProduct(subcatid)
   }
   const getProductData=async(x)=>{
    alert(x)
    const re=await fetch("http://localhost:3000/api/v1/product/detail/update/"+x,{
      method:"get",
      headers:{"content-type":"application/json"}
    })
    const data=await re.json()
    setpName1(data[0].productName)
    setprice1(data[0].productPrice)
    setofferprice1(data[0].offerPrice)
    setdesc1(data[0].description)
    setproductId(x)
   }
   const recordUpdate=async()=>{
    alert(productId)
    alert(pname1)
    
    const re=await fetch("http://localhost:3000/api/v1/product/detail",{
      method:"put",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({productId,pname1,price1,offerprice1,desc1})
    })
    const data=await re.json()
    // setproductData(data)
    setpName1(pname1)
    setprice1(price1)
    setofferprice1(offerprice1)
    setdesc1(desc1)
    alert(data.msg)
    displayProduct(subcatid)
   }
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Dashboard}>
          <h2>Dashboard</h2>
          <div className={styles.list}>
            <ul>
              <Link to="/category">
                <li>Category</li>
              </Link>
              <Link to="/subcategory">
                <li>subcategory</li>
              </Link>

              <Link to="/product">
                <li>product</li>
              </Link>

              <Link to="/vieworder">
                <li>vieworder</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className={styles.CategoryDiv}>
          <div className={styles.Btn}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Add Product
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title"> Add Product</h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      style={{ marginLeft: "500px" }}
                    >
                      <span>
                        <IoMdClose />
                      </span>{" "}
                    </button>
                  </div>

                  <div className="modal-body">
                    <label>category name</label>

                    <select className="form-control" onChange={(e)=>getsubCatData(e.target.value)}>
                      <option value="select">select</option>
                      {
                        catData.map((item,i)=>{
                            return(
                                <>
                                <option key={i} value={item._id}>{item.categoryName}</option>
                                </>
                            )
                        })
                      }
                      
                    </select>

                    <label>subcategory name</label>

                    <select className="form-control" onChange={(e)=>setsubcatId(e.target.value)}>
                      <option value="select">select</option>
                      {
                subcatData.map((item,i)=>{
                    return(
                        <>
              <option key={i} value={item._id}>{item.subcatName}</option>

                        </>
                    )
                })
              }
                    </select>
                    <label>Product name</label>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="form-control"
                      onChange={(e)=>setpName(e.target.value)}
                      
                    />
                  
                  
                    <label>Product Pic</label>
                    <input
                      type="file"
                      placeholder="add category pic"
                      className="form-control"
                      onChange={(e)=>setprodPic(e.target.files[0])}
                    />
                  
                 
                    <label>Price</label>
                    <input
                      type="text"
                      placeholder="price"
                      className="form-control"
                      onChange={(e)=>setprice(e.target.value)}
                    />
                  
                 
                    <label>offer Price</label>
                    <input
                      type="text"
                      placeholder=" offer price"
                      className="form-control"
                      onChange={(e)=>setofferprice(e.target.value)}
                    />
               
                   
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="description"
                      className="form-control"
                      onChange={(e)=>setdesc(e.target.value)}
                    />
                 
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={recordSaved}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button>logout</button>
          </div>
          <div className={styles.inpCont}>
            <p>Category Name</p>
            <select className={`form-control ${styles.inp}`} onChange={(e)=>getsubCatData(e.target.value)}>
              <option value="select">select</option>
              {
                        catData.map((item,i)=>{
                            return(
                                <>
                                <option key={i} value={item._id}>{item.categoryName}</option>
                                </>
                            )
                        })
                      }
            </select>
          </div>

          <div className={styles.inpCont}>
            <p>SubCategory Name</p>
            <select className={`form-control ${styles.inp}`} onChange={(e)=>displayProduct(e.target.value)}>
              <option value="select" >select</option>
              {
                subcatData.map((item,i)=>{
                    return(
                        <>
              <option key={i} value={item._id}>{item.subcatName}</option>

                        </>
                    )
                })
              }
              
            </select>
          </div>
          <div className={styles.CategoryItem}>
            <table
              className="table table-borderd table-hover"
              style={{ border: "2px solid black" }}
            >
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>offer Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
{
  productData.map((x,i)=>{
    return(
      <tr>
      <td>
        <img
          src={"http://localhost:3000/"+x.productImg}
          className={styles.CategoryImg}
        />
        
      </td>
      <td> {x.productName}</td>
      <td>{x.productPrice}</td>
      <td>{x.offerPrice}</td>
      <td>{x.description}</td>
      <td>
        <span
          className="text-success"
          data-bs-toggle="modal"
          data-bs-target="#myUpdate"
          onClick={()=>getProductData(x._id)}
        >
          <FaEdit />
        </span>
        <span className="text-danger" onClick={()=>recordDelete(x._id)}>
          <MdDelete />
        </span>
      </td>
    </tr>
    )
  })
}
             
            </table>
          </div>
        </div>
      </div>

      <div className="modal" id="myUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">update Product</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                style={{ marginLeft: "500px" }}
              >
                <span>
                  <IoMdClose />
                </span>{" "}
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="product name"
                className="form-control"
                value={pname1}
                onChange={(e)=>setpName1(e.target.value)}
              />
              <input
                type="text"
                placeholder="price"
                className="form-control"
                value={price1}
                onChange={(e)=>setprice1(e.target.value)}

              />
               <input
                type="text"
                placeholder=" offer price"
                className="form-control"
                value={offerprice1}
                onChange={(e)=>setofferprice1(e.target.value)}

              />
              <input
                type="text"
                placeholder="description"
                className="form-control"
                value={desc1}
                onChange={(e)=>setdesc1(e.target.value)}

              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={recordUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
