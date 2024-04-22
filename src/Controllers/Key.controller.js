const AsyncHandler = require("../Utils/AsyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const key = require("../Model/APIKey.model");

const getAPIKeys = AsyncHandler(async(req,res,next)=>{
    console.log(req.users)
     const {_id} = req.users
    const user = _id
    const responce = await key.find({user}).populate('user')
    res.status(200).json({success:true,message:"Keys found ",responce})
})

const createKey = AsyncHandler(async(req,res,next)=>{
    const {_id} = req.users
    const user = _id
    const random = Math.ceil(Math.random()*1000000)
    console.log(random)
    const responce = await key.create({user,APIkey:random+1000000})
    console.log(responce)
    res.status(200).json({success:true,message:"Keys created ",responce})
})

const deleteKey = AsyncHandler(async(req,res,next)=>{
    const {_id} = req.body
    const responce = await key.findByIdAndDelete({_id})
    if(!responce)
        return next(new ErrorHandler("API key doesn't exist",404))
    res.status(200).json({success:true,message:"API Key deleted successfully"})
})

module.exports = {getAPIKeys,createKey,deleteKey}