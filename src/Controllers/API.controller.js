const AsyncHandler = require("../Utils/AsyncHandler.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const key = require("../Model/APIKey.model.js");
const user = require("../Model/User.model.js");
const request = require("../Model/RequestPerDay.model.js");
const result = require("../Public/responce.json")
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const date = new Date()
const makeRequest = AsyncHandler(async(req,res,next)=>{
    const {authKey} = req.query
    let responce
    try{
         responce = await key.findOneAndUpdate({_id:authKey},{$inc:{requests:1}})
    }catch(err){
         return res.status(401).json({status:"error",code:'apiKeyInvalid',message:'Your API key is invalid or incorrect. Check your key'})
    }
    if(!responce)  
        return res.status(401).json({status:"error",code:'apiKeyInvalid',message:'Your API key is invalid or incorrect. Check your key'})
    const userResponce = await user.findByIdAndUpdate({_id:responce.user},{$inc:{requests:1}})
    const newDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    const reqResponce = await request.findOneAndUpdate({user:responce.user,date:newDate},{$inc:{requests:1}})
    if(!reqResponce){
        await request.create({user:responce.user,date:newDate})
    }
    res.status(200).json({status:"ok",totalResults:30,result})
})

module.exports = {makeRequest}
