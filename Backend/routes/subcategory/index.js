const express=require("express")
const multer = require("multer")
const path=require("path")
// const connectDB = require("../../db")

// connectDB()
const subcatRoute=express.Router()
const subCategoryModel = require("../../models/subCategoryModel")
const createsubproduct = require("../../controller/subcategory")
const myStorage1=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"subcatPics")
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + path.extname(file.originalname))
            // cb(null,Date.now() + path.extname(file.originalname))
        }
    }
)
const uploadsubcatPic=multer({
    storage:myStorage1
})

 
subcatRoute.post("/subcategory",uploadsubcatPic.single("subcatPic"),createsubproduct) 
subcatRoute.get("/subcategory/:catid",async(req,res)=>{
    // console.log(req.params.catId)
    const re=await subCategoryModel.find({catId:req.params.catid});
    // const re=await subCategoryModel.find({catId:req.body.id});

    // console.log(re)
    res.json(re);
    // console.log(re)
})   
subcatRoute.delete("/subcategory",async(req,res)=>{
    const re=await subCategoryModel.findOneAndDelete({_id:req.body.subcatId})
    // console.log(req.body.subcatId)
    
    res.json({msg:"record delete"})
})
 subcatRoute.get("/subcategory/update/:id",async(req,res)=>{
    const re=await subCategoryModel.find({_id:req.params.id})
    res.json(re)
    console.log(req.params.id)
 })
subcatRoute.put("/subcategory",async(req,res)=>{
    const re=await subCategoryModel.findByIdAndUpdate({_id:req.body.catid1},{subcatName:req.body.subcatname1})
    res.json({msg:"record update"})
})
module.exports=subcatRoute    