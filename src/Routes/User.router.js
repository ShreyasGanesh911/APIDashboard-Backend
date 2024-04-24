const express = require("express")
const { createUser, loginUser } = require("../Controllers/User.controller")
const { getAPIKeys, createKey, deleteKey, APIRequests } = require("../Controllers/Key.controller")
const auth = require("../Middleware/Auth")
const { makeRequest } = require("../Controllers/API.controller")
const userRouter = express.Router()

userRouter.post('/signup',createUser)
userRouter.post('/login',loginUser)

userRouter.post('/getKeys',auth,getAPIKeys)
userRouter.post('/createKey',auth,createKey)
userRouter.delete("/deleteKey",auth,deleteKey)
userRouter.get('/allRequests',auth,APIRequests)

userRouter.get('/make',makeRequest)
module.exports = userRouter