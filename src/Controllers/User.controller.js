const jwt = require("jsonwebtoken");
require("dotenv").config()
const user = require("../Model/User.model");
const AsyncHandler = require("../Utils/AsyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");

const createUser = AsyncHandler(async(req,res,next)=>{
    const {phone,name,email,password} = req.body

    const responce = await user.create({email,name,password,phone})
    console.log(responce)
    res.status(201).json({success:true,message:"User created",responce})
})

const loginUser = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    const responce = await user.findOne({email})
    if(!responce)
        return next(new ErrorHandler("User doesn't exist",404))
    console.log(responce)
    if(responce.password === password){
         const AuthToken = jwt.sign({responce},process.env.JWT_KEY,{expiresIn:"1d"})
        return res.cookie('AuthToken',AuthToken).status(200).json({success:true,message:"User logged in"})
    }
        
    next(new ErrorHandler("Incorrect credentials",401))
})

module.exports = {createUser,loginUser}