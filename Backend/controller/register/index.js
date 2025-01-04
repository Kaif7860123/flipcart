const connectDB = require("../../db")
const express=require("express")
const bodyParser=require("body-parser")

const app=express()
app.use(bodyParser.json())
const registerModel = require("../../models/registerModel")
const encryptData = require("../../helpers/encrypt")
const decryptData = require("../../helpers/decrypt")
const getRegister=async(req,res)=>{
    const re=await registerModel.find()
    res.json(re)
}
const createRegister=async(req,res)=>{
    const {email,password,confirmPassword}=req.body
    const isExisting=await registerModel.findOne({email})
    const validPassword=password.length>=6||confirmPassword.length>=6
    if(isExisting){
        return res.send("email is already exist")
    }
    if(!validPassword){
        return res.status(400).send("please enter valid password")
    }
    const re=new registerModel({
        
        userName:req.body.uname,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.cPassword
        // ,password:encryptData(password),
        // confirmPassword:encryptData(confirmPassword),
        // email:encryptData(email)
    
    })
    connectDB()
    await re.save()
    res.json({msg:"record saved"})
    console.log(req.body.password);
}
module.exports={
    getRegister,
    createRegister
}