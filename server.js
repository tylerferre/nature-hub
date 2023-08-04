const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
require('dotenv').config()
const path = require('path')

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.connect(
    'mongodb://localhost:27017/nature-hub-db',
    () => console.log('Connected to DB')
)

app.use('/proxy/auth', require('./routes/authRouter.js'))
app.use('/proxy/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/proxy/api/post', require('./routes/postRouter.js'))
app.use('/proxy/api/comment', require('./routes/commentRouter.js'))
app.use('/proxy/api/img', require('./routes/imgRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(9000, () => {
    console.log('Server is running on port 9000')
})