const jwt = require("jsonwebtoken");
require("dotenv").config()
const user = require("../Model/User.model.js");
const AsyncHandler = require("../Utils/AsyncHandler.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const key = require("../Model/APIKey.model.js");
const request = require("../Model/RequestPerDay.model.js");
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const createUser = AsyncHandler(async(req,res,next)=>{
    const {phone,name,email,password} = req.body
    const responce = await user.create({email,name,password,phone})
    const{_id} = responce
    const api = await key.create({user:_id,tag:"First key",APIkey:"First key"})
    res.status(201).json({success:true,message:"User created",responce})
})

const loginUser = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    const responce = await user.findOne({email})
    if(!responce)
        return next(new ErrorHandler("User doesn't exist",404))

    if(responce.password === password){
         const AuthToken = jwt.sign({responce},process.env.JWT_KEY,{expiresIn:"1d"})
        return res.cookie('AuthToken',AuthToken,{httpOnly:true,sameSite:"none",secure:true}).status(200).json({success:true,message:"User logged in"})
    }
        
    next(new ErrorHandler("Incorrect credentials",401))
})
const aboutUser = AsyncHandler(async(req,res,next)=>{
    const date = new Date()
    const {_id} = req.users
    const responce = await user.findById({_id}).select('-password')
    const keys = await key.find({user:_id})
  
    const result = {
        name:responce.name,
        start:`${responce.date.getDate()}-${month[responce.date.getMonth()]}-${responce.date.getFullYear()}`,
        end:`${responce.endDate.getDate()}-${month[responce.endDate.getMonth()]}-${responce.date.getFullYear()}`,
        remaining:Math.floor((responce.endDate.getTime()-date.getTime() )/(1000 * 60 * 60 * 24)),
        requests:responce.requests,
        keys,
        totalKeys:keys.length
    }
    res.status(200).json({success:true,responce:result})
})

const logout = AsyncHandler(async(req,res,next)=>{
    res.clearCookie("AuthToken").status(200).json({success:true,message:"User logged out"});
    
})

module.exports = {createUser,loginUser,aboutUser,logout}