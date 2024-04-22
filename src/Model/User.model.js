const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"Email not provided"]
    },
    name:{
        type:String,
        required:[true,"Name not provided"]
    },
    password:{
        type:String,
        required:[true,"Password not provided"]
    },
    phone:{
        type:Number,
        unique:true,
        required:[true,"Phone number not provided"]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        default:() => new Date(+new Date() + 30*24*60*60*1000)
    },
    requests:{
        type:Number,
        default:0
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user