 const crypto_js=require("crypto-js")
const encryptData=(data)=>{
return crypto_js.AES.encrypt(data,process.env.CJS_SECRET_KEY)
}
module.exports=encryptData