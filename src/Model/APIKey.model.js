const mongoose = require("mongoose");

const keySchema =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    key:{
        type:String,
        unique:true,
        require:[true,"Key not provided"]
    }
})

const key = mongoose.model("key",keySchema)
module.exports = keySchema