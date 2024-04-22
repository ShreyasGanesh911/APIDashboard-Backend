const app = require("./App");
const connection = require("./database");

connection().then(()=>{
    app.listen(4000,()=>{
        console.log("Active at port 4000")
    })
}).catch((e)=>{
    console.log("Error connecting to mongodb")
})