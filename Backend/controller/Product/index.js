const connectDB = require("../../db")
const { find } = require("../../models/categoryModel")
const productModel = require("../../models/productModel")

//  const productModel = require("../../models/productModel")
const getProduct=async(req,res)=>{
    const re=await productModel.find({subcatId:req.params.id})
    res.json(re)
    // res.send("successfully get product")
}
const getProductUpdate=async(req,res)=>{
    const re=await productModel.find({_id:req.params.id})
    res.json(re)
    console.log(req.params.id)
    // res.send("successfully get product")
}
const createProduct=async(req,res)=>{
    const re=new productModel({
        catId:req.body.catid,
        subcatId:req.body.subcatId,
        productName:req.body.productName,
        productImg:req.file.filename,
        productPrice:req.body.productPrice,
        offerPrice:req.body.offerPrice,
        description:req.body.description

    })
    connectDB()
    await re.save()
 
res.json({msg:"record saved"})
}
const deleteProduct=async(req,res)=>{
    const re=await productModel.findOneAndDelete({_id:req.body.productId})
    res.json({msg:"record deleted"})
}
const updateRecord=async(req,res)=>{
    const re=await productModel.findOneAndUpdate({_id:req.body.productId},{productName:req.body.pname1,
        productPrice:req.body.price1,offerPrice:req.body.offerprice1,description:req.body.desc1}
    )
    console.log(req.body)
    // await re.save()
    res.json({msg:"record updated"})
}
module.exports={
    getProduct,
    createProduct,
    deleteProduct,
    getProductUpdate,
    updateRecord
    
 }