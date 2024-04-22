const  mongoose  = require("mongoose");
require('dotenv').config()
const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
    }
    catch(e){
        console.log("Connection error " ,e)
    }
}

module.exports = connection