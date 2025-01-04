import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./index.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function Subcategory() {
  const [getData, setgetData] = useState([]);
  const [catid, setcatId] = useState();
  const [catid1, setcatId1] = useState();
  const [subcatname, setsubName] = useState();
  const [subcatname1, setsubName1] = useState();
  const [subcatpic, setsubPic] = useState();
  const [subcatData, setsubData] = useState([]);
  useEffect(() => {
    getRecord();
    displayRecord();
   
  }, []);
  const getRecord = async () => {
    const re = await fetch("http://localhost:3000/api/v1/category", {
      method: "get",
      headers: { "content-type": "application/json" },
    });
    const data = await re.json();
    setgetData(data);
  };
  const recordSaved = async () => {
    const fdata = new FormData();
    fdata.append("catId", catid);
    fdata.append("subcatName", subcatname);
    fdata.append("subcatPic", subcatpic);
    const re = await fetch("http://localhost:3000/api/v1/subcategory", {
      method: "post",
      body: fdata,
    });
    const data = await re.json();
  //  alert(catid)
    alert(data.msg);
    // console.log(subcatname)
    displayRecord(catid)
  };
  
  const displayRecord=async(x="675d9e2ae32def229dbef609")=>{
    // alert(x);
    const re=await fetch("http://localhost:3000/api/v1/subcategory/"+x,{
      method:"get",
      headers:{"content-type":"application/json"},
      // body:JSON.stringify({id:x})
    })
    const data=await re.json()
    setsubData(data)
    setcatId(x) 
  }
  const recordDelete=async(x)=>{
// alert(x)
const re=await fetch("http://localhost:3000/api/v1/subcategory",{
  method:"delete",
  headers:{"content-type":"application/json"},
  body:JSON.stringify({subcatId:x})
})
const data=await re.json()
alert(data.msg)
displayRecord(catid)
  }
  // const getsubRecord=async(x)=>{
  //   alert(x)
  //   const re=await fetch("http://localhost:3000/api/v1/subcategory/"+x,{
  //     method:"get",
  //     headers:{"content-type":"application/json"}
  //   })
  //   console.log(re)
  // }
  const getsubRecord=async(x)=>{
alert(x)
const re=await fetch("http://localhost:3000/api/v1/subcategory/update/" + x,{
  method:"get",
  headers:{"content-type":"application/json"},

})
const data=await re.json()
setsubName1(data[0].subcatName)
 
setcatId1(x)

  }
 
  const recordUpdate=async()=>{
    alert(catid1)
    alert(subcatname1)
    const re=await fetch("http://localhost:3000/api/v1/subcategory",{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({catid1,subcatname1})
    })
    const data=re.json()
    setsubName1(subcatname1)
    alert(data.msg)
    displayRecord(catid)
  }
   
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Dashboard}>
          <h2>Dashboard</h2>
          <div className={styles.list}>
            <ul>
              
            <Link to="/category" ><li>Category</li></Link>
            <Link to="/subcategory"><li>subcategory</li></Link>

            <Link to="/product"><li>product</li></Link>

            <Link to="/vieworder"><li>vieworder</li></Link>
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
              Add New Subcategory
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title"> Add Subcategory</h4>
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

                    <select className="form-control" onChange={(e)=>displayRecord(e.target.value)}>
                    <option value="select">select</option> 

                      {getData.map((item, i) => {
                        return (
                          <>
                            <option value={item._id} >
                              {item.categoryName}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="modal-body">
                    <label>Subcategory name</label>
                    <input
                      type="text"
                      placeholder="Subcategory name"
                      onChange={(e) => setsubName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="modal-body">
                    <label>subcategory Pic</label>
                    <input
                      type="file"
                      placeholder="add category pic"
                      onChange={(e) => setsubPic(e.target.files[0])}
                      className="form-control"
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
            <select className={`form-control ${styles.inp}`} onChange={(e)=>displayRecord(e.target.value)}>
            <option value="select">select</option>

              {getData.map((item, i) => {
                return (
                  <>
                    <option value={item._id}>{item.categoryName}</option>
                  </>
                );
              })}
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
                  <th>Subcategory Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {subcatData.map((m,i) => {
                return (
                  <>
                    <tr>
                      <td>
                        <img
                         src={"http://localhost:3000/"+m.subcatPic}
                          className={styles.CategoryImg} key={i} alt="pic"
                        />
                        
                      </td>
                      <td key={i}>{m.subcatName}</td>
                      <td>
                        <span
                          className="text-success"
                          data-bs-toggle="modal"
                          data-bs-target="#myUpdate"
                        onClick={()=>getsubRecord(m._id)}
                        
                        >
                          <FaEdit />
                        </span>
                        <span className="text-danger" onClick={()=>recordDelete(m._id)}>
                          <MdDelete />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      <div className="modal" id="myUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">update Category</h4>
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
                placeholder="update category"
                className="form-control"
                onChange={(e)=>setsubName1(e.target.value)}
                value={subcatname1}
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

export default Subcategory;
