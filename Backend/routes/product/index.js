const express=require("express")
const path=require("path")
const app=express()
app.use(express.json())

const bodyParser=require("body-parser")
app.use(bodyParser.json())
const { getProduct, createProduct, deleteProduct, getProductUpdate, updateRecord } = require("../../controller/Product")
const multer = require("multer")
// const productModel = require("../../models/productModel")
const productRoute=express.Router()
productRoute.get("/product/detail/:id",getProduct)
productRoute.get("/product/detail/update/:id",getProductUpdate)
 const myProduct=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"productPic")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
 })
 const uploadProductPic=multer({
    storage:myProduct
 })
productRoute.post("/product/detail",uploadProductPic.single("productImg"),createProduct)
productRoute.delete("/product/detail", deleteProduct)
productRoute.put("/product/detail",updateRecord)
module.exports=productRoute