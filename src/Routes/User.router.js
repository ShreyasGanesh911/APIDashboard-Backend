const express = require("express")
const { createUser, loginUser ,aboutUser, logout} = require("../Controllers/User.controller.js")
const { getAPIKeys, createKey, deleteKey, APIRequests } = require("../Controllers/Key.controller.js")
const auth = require("../Middleware/Auth.js")
const { makeRequest } = require("../Controllers/API.controller.js")
const userRouter = express.Router()

userRouter.post('/signup',createUser)
userRouter.post('/login',loginUser)
userRouter.get('/about',auth,aboutUser)
userRouter.get('/logout',logout)

userRouter.post('/getKeys',auth,getAPIKeys)
userRouter.post('/createKey',auth,createKey)
userRouter.delete("/deleteKey",auth,deleteKey)
userRouter.get('/allRequests',auth,APIRequests)

userRouter.get('/make',makeRequest)
module.exports = userRouter