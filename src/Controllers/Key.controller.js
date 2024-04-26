const AsyncHandler = require("../Utils/AsyncHandler.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const key = require("../Model/APIKey.model.js");
const request = require("../Model/RequestPerDay.model.js");

const getAPIKeys = AsyncHandler(async(req,res,next)=>{
     const {_id} = req.users
    const user = _id
    const responce = await key.find({user}).populate('user')
    res.status(200).json({success:true,message:"Keys found ",responce})
})

const createKey = AsyncHandler(async(req,res,next)=>{
    const {_id} = req.users
    const {tag} = req.body
    
    const user = _id
    const random = Math.ceil(Math.random()*1000000)
    const responce = await key.create({user,APIkey:tag,tag})
    res.status(200).json({success:true,message:"Keys created ",responce})
})

const deleteKey = AsyncHandler(async(req,res,next)=>{
    const {_id} = req.body
    const responce = await key.findByIdAndDelete({_id})
    if(!responce)
        return next(new ErrorHandler("API key doesn't exist",404))
    res.status(200).json({success:true,message:"API Key deleted successfully"})
})

const APIRequests = AsyncHandler(async(req,res,next)=>{
    const {_id} = req.users
    const user = _id    
    const responce = await request.find({user}).sort({date:1}).limit(15)
    res.status(200).json({success:true,message:"Requests found ",responce})
})

module.exports = {getAPIKeys,createKey,deleteKey,APIRequests}