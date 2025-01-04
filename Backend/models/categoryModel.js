const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/category")
const categorySchema=new mongoose.Schema({
    categoryName:{type:String,required:true},
    categoryPic:{type:String,required:true}
})
module.exports=mongoose.model("category",categorySchema)