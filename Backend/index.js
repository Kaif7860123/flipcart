const express=require("express")
const cors=require("cors")
const app =express()
const exp = require("constants")
const subcatRoute = require("./routes/subcategory")
const productRoute = require("./routes/product")
require("dotenv").config()
const categoryRoute = require("./routes/category")
const registerUser = require("./routes/register")
const path = require("path")
app.use(cors())
app.use(express.json())
app.use(express.static("catPic"))
// app.use(express.static("subcatPics"))
app.use(express.static("subcatPics"))
app.use(express.static("productPic"))
app.use("/api/v1",categoryRoute)
app.use("/api/v1",subcatRoute)
app.use("/api/v1",productRoute)
app.use("/api/v1",registerUser)

// .......code for production.....


if (process.env.NODE_ENV==="production"){
    const dirPath=path.resolve();
    app.use(express.static("./Frontend/dist"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"))
    })
}
app.listen(3000,()=>{
    console.log(`app listening at port 3000`)
})