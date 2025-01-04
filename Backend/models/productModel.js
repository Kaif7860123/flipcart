const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/product").then(()=>{
//     console.log("connection done successfully")
// }).catch((err)=>{
//     console.log(`error: ${err}`) 
// })
const productSchema=mongoose.Schema({
    catId:{type:String,required:true},
    subcatId:{type:String,required:true},
    productImg:{type:String,required:true},
    productName:{type:String,required:true},
    productPrice:{type:String,required:true},
    offerPrice:{type:String,required:true},
    description:{type:String,required:true} 
})
module.exports=mongoose.model("product",productSchema)