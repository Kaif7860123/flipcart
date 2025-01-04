const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/subcategory")
const subcatmodel=new mongoose.Schema({
    catId:{type:String,required:true},
    subcatName:{type:String,required:true}, 
   subcatPic:{type:String,required:true}
})
module.exports=mongoose.model("subcat",subcatmodel)