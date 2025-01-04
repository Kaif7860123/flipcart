const mongoose=require("mongoose")
const userRegisterSchema=mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true}
})
// userRegisterSchema.methods.generateToken= async function(){

// }
module.exports=mongoose.model("register",userRegisterSchema)