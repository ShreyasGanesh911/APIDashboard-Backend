const express = require ('express')
const APIError = require('./Utils/APIError')
const userRouter = require('./Routes/User.router.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true}))
app.use('/user',userRouter)
app.use(APIError)

module.exports = app