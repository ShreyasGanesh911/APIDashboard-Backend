const AsyncHandler = require("../Utils/AsyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const key = require("../Model/APIKey.model")
const makeRequest = AsyncHandler(async(req,res,next)=>{
    const {authKey} = req.query
    console.log(authKey)
    const responce = await key.findOne({_id:authKey})
    console.log(responce)
    res.send({responce})
})

module.exports = {makeRequest}