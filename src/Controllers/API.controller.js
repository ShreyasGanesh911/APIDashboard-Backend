const AsyncHandler = require("../Utils/AsyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const key = require("../Model/APIKey.model");
const user = require("../Model/User.model");
const request = require("../Model/RequestPerDay.model");
const result = require("../Public/responce.json")
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const date = new Date()
const makeRequest = AsyncHandler(async(req,res,next)=>{
    const {authKey} = req.query
    console.log(authKey)
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
    console.log(responce)
    console.log(userResponce)
    console.log(reqResponce)
    res.send({status:"ok",totalResults:30,result})
})

module.exports = {makeRequest}

//"status": "error",
//"code": "apiKeyInvalid",
//"message": "Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key."