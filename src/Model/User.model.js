const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:[true,"Email not provided"]
    },
    name:{
        type:String,
        require:[true,"Name not provided"]
    },
    password:{
        type:String,
        require:[true,"Password not provided"]
    },
    phone:{
        type:Number,
        unique:true,
        require:[true,"Phone number not provided"]
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user