const  mongoose  = require("mongoose");

const connection = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/APIDashboard")
        console.log("connected to mongodb")
    }
    catch(e){
        console.log("Connection error " ,e)
    }
}

module.exports = connection