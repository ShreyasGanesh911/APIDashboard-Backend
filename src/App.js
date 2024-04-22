const express = require ('express')
const APIError = require('./Utils/APIError')
const ErrorHandler = require('./Utils/ErrorHandler')
const AsyncHandler = require('./Utils/AsyncHandler')
const app = express()
app.use(express.json())
app.use(APIError)

module.exports = app
