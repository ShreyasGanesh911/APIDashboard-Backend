const mongoose  = require("mongoose");

const requestSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        unique:false
    },
    date:{
        type:String,
        required:[true,"date not provided"]
    },
    requests:{
        type:Number,
        default:1
    }

})

const request = mongoose.model('request',requestSchema)
module.exports = request