const mongoose=require("mongoose")
require("dotenv").config()
const connectDB=()=>{
    try{
        mongoose.connect(process.env.MONGO)
        // console.log(process.env.MONGO)
        console.log("connection done")
    }
    catch(err){
        console.log(`error ${err}`)
    }
}
module.exports=connectDB