const connectDB = require("../../db")
const subCategoryModel = require("../../models/subCategoryModel")

const createsubproduct=async(req,res)=>{  
const re=new subCategoryModel(
    {
        catId:req.body.catId,
        subcatName:req.body.subcatName,
        subcatPic:req.file.filename
    }   
)
connectDB()
await re.save()
res.json({msg:"record saved" })
}
module.exports=createsubproduct