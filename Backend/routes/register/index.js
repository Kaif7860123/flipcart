const express=require("express")
const { getRegister, createRegister } = require("../../controller/register")
const  registerUser=express.Router()
registerUser.get("/register",getRegister)
registerUser.post("/register",createRegister)

module.exports=registerUser