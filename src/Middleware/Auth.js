const jwt = require("jsonwebtoken")
const ErrorHandler = require("../Utils/ErrorHandler")
const user = require("../Model/User.model")
require('dotenv').config()
const auth = async(req,res,next)=>{
try{
    const {AuthToken} = req.cookies
    jwt.verify(AuthToken,process.env.JWTKEY,async(err,users)=>{
        if(err){
         res.clearCookie('AuthToken')
         return next(new ErrorHandler("Invalid token",401))
        }
        const responce = await user.findById({_id:users.responce._id})
        if(!responce)
            return next(new ErrorHandler("Unauth user. Need to login",401))
        req.users = responce
        next()
    })
}
catch(err){
    console.log("Error",err)
}
}

module.exports = auth