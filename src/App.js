const express = require ('express')
const APIError = require('./Utils/APIError')
const userRouter = require('./Routes/User.router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials: true}))
app.use('/user',userRouter)
app.use(APIError)

module.exports = app
