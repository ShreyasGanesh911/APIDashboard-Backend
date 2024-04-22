const express = require("express")
const { createUser, loginUser } = require("../Controllers/User.controller")
const { getAPIKeys, createKey, deleteKey } = require("../Controllers/Key.controller")
const userRouter = express.Router()

userRouter.post('/signup',createUser)
userRouter.post('/login',loginUser)

userRouter.post('/getKeys',getAPIKeys)
userRouter.post('/createKey',createKey)
userRouter.delete("/deleteKey",deleteKey)
module.exports = userRouter