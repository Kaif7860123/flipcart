import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
function Category() {
  const [catName, setcatName] = useState();
  const [catName1, setcatName1] = useState();
  const [catPic, setcatPic] = useState();
  const [catData, setcatData] = useState([]);
  const[cid,setcid]=useState();
  useEffect(() => {
    displayRecord();
    
  }, []);
  const recordSaved = async () => {
    const fdata = new FormData();
    fdata.append("categoryName", catName);
    fdata.append("categoryPic", catPic);
    const re = await fetch("http://localhost:3000/api/v1/category", {
      method: "post",
      body: fdata,
    });
    const data = await re.json();
    alert(data.msg);
    displayRecord();
  };
     const displayRecord = async () => {
    const re = await fetch("http://localhost:3000/api/v1/category", {
      method: "get",
      headers: { "content-type": "application/json" },
    });
    const data = await re.json();
    setcatData(data);
  };
  const recordDelete = async (m) => {
    // alert(m)
    const re = await fetch("http://localhost:3000/api/v1/category", {
      method: "delete",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cid: m }),
    });
    const data = await re.json();
    alert(data.msg);
    displayRecord()
  };
  const getRecord=async(m)=>{
    alert(m)
    const re=await fetch("http://localhost:3000/api/v1/category/" +m,{
      method:"get",
      headers:{"content-type":"application/json"}
    })
    const data=await re.json()
     setcatName1(data[0].categoryName)
     setcid(m)
     displayRecord()
  }
  const updateRecord= async()=>{
    const re=await fetch("http://localhost:3000/api/v1/category",{
      method:"put",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        categoryName:catName1,
        cid})
    })
    const data=await re.json()
    alert(data.msg)
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
            {/* <button>Add New Category</button> */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Add New Category
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title"> Add Category</h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal" style={{marginLeft:"500px"}}
                    ><span><IoMdClose/></span> </button>
                  </div>

                  <div className="modal-body">
                    <input
                      type="text"
                      placeholder="add category"
                      onChange={(e) => setcatName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="modal-body">
                    <input
                      type="file"
                      placeholder="add category pic"
                      onChange={(e) => setcatPic(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={recordSaved}
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button>logout</button>
          </div>
          <div className={styles.CategoryItem}>
            <table
              className="table table-borderd table-hover"
              style={{ border: "2px solid black" }}
            >
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {catData.map((x) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={"http://localhost:3000/" + x.categoryPic}
                        className={styles.CategoryImg} alt="pic"
                      />
                    </td>
                    <td> {x.categoryName}</td>
                    <td>
                      <span
                        className="text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#myUpdate" 
                        onClick={()=>getRecord(x._id)}
                      >
                        <FaEdit />
                      </span>
                      <span
                        className="text-danger"
                        onClick={() => recordDelete(x._id)}
                      >
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
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
                      data-bs-dismiss="modal" style={{marginLeft:"500px"}}
                    ><span><IoMdClose/></span> </button>
                  </div>

                  <div className="modal-body">
                    <input
                      type="text" value={catName1}
                      placeholder="update category"
                      onChange={(e) => setcatName1(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={updateRecord}
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
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

export default Category;
