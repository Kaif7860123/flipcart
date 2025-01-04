const express=require("express")
const categoryModel = require("../../models/categoryModel")
const path=require("path")

const multer = require("multer")
const connectDB = require("../../db")
connectDB()

require("dotenv").config()
const categoryRoute=express.Router()
categoryRoute.get("/category",async(req,res)=>{
    const re=await categoryModel.find()
         res.json(re)
})
categoryRoute.get("/category/:id",async (req,res)=>{    
    const re=await categoryModel.find( {_id:req.params.id})
     res.json(re)
})

const myStorage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"catPic")
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + path.extname(file.originalname))
        }
    }
)
const uploadPic=multer({
    storage:myStorage
})
categoryRoute.post("/category",uploadPic.single("categoryPic"),async(req,res)=>{
    const re= new categoryModel({
        categoryName:req.body.categoryName,
        categoryPic:req.file.filename     
    })
    console.log(req.body)
    await re.save()
    res.json({msg:"record saved"})
} )

categoryRoute.delete("/category",async(req,res)=>{
    const re=await categoryModel.findOneAndDelete({_id:req.body.cid})
    res.json({msg:"record deleted"})
})

categoryRoute.put("/category",async(req,res)=>{
    const re=await categoryModel.findByIdAndUpdate(
        {_id:req.body.cid},
        {categoryName:req.body.categoryName})        
    await re.save()
    res.send({msg:"record update"})
})
module.exports=categoryRoute