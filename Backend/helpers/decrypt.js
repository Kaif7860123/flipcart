const crypto_js=require("crypto-js")
const decryptData=(data)=>{
return crypto_js.AES.decrypt(data,process.env.CJS_SECRET_KEY)
}
module.exports=decryptData