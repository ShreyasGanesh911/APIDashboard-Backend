const jwt = require("jsonwebtoken");
require("dotenv").config()
const user = require("../Model/User.model");
const AsyncHandler = require("../Utils/AsyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
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
const aboutUser = AsyncHandler(async(req,res,next)=>{
    const date = new Date()
    const {_id} = req.users
    const responce = await user.findById({_id}).select('-password')
    const result = {
        name:responce.name,
        start:`${responce.date.getDate()}-${month[responce.date.getMonth()]}`,
        end:`${responce.endDate.getDate()}-${month[responce.endDate.getMonth()]}`,
        remaining:Math.floor((responce.endDate.getTime()-date.getTime() )/(1000 * 60 * 60 * 24))
    }
    res.status(200).json({success:true,responce:result})
})

module.exports = {createUser,loginUser,aboutUser}