// const getCategory=async(req,res)=>{
//     const re=await categoryModel.find()
//          res.json(re)
// }
// const getCategoryById=async (req,res)=>{    
//     const re=await categoryModel.find( {_id:req.params.id})
//      res.json(re)
// }
// // const myStorage=multer.diskStorage(
// //     {
// //         destination:(req,file,cb)=>{
// //             cb(null,"catPic")
// //         },
// //         filename:(req,file,cb)=>{
// //             cb(null,Date.now() + path.extname(file.originalname))
// //         }
// //     }
// // )
// // const uploadPic=multer({
// //     storage:myStorage
// // })
// // const createCategory=uploadPic.single("categoryPic"),async(req,res)=>{
// //     const re= new categoryModel({
// //         categoryName:req.body.categoryName,
// //         categoryPic:req.file.filename     
// //     })
// //     console.log(req.body)
// //     await re.save()
// //     res.json({msg:"record saved"})
// // }
// module.exports={
//     getCategory,
//     getCategoryById
// }