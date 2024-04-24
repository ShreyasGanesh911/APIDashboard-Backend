const mongoose = require("mongoose");

const keySchema =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        unique:false
    },
    tag:{
        type:String,
        required:[true,'Name not provided']
    },
    active:{
        type:Boolean,
        default:true
    },
    APIkey:{
        type:String,
        unique:true,
        required:[true,"Key not provided"]
    },
    requests:{
        type:Number,
        default:0
    }
})

const key = mongoose.model("key",keySchema)
module.exports = key