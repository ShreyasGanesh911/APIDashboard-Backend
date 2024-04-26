const app = require("./app");
require("dotenv").config()
const PORT = process.env.PORT || 4000
const connection = require("./database/index.js");

connection().then(()=>{
    app.listen(PORT,()=>{
        console.log("Active at port ",PORT)
    })
}).catch((e)=>{
    console.log("Error connecting to mongodb")
})