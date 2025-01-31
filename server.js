const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const path = require('path');
const Grid = require('gridfs-stream');
require('dotenv').config();
const uri = process.env.URI
let gfs;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "client", "dist")));


mongoose.set('strictQuery', false);
mongoose.connect(
    // uri,
    "mongodb+srv://tylerferre:hXq45dJcvmwJkGBN@cluster0.fvepsva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    () => console.log('Connected to DB')
);

const conn = mongoose.connection;
conn.once("open", function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
})


app.use('/proxy/auth', require('./routes/authRouter.js'));
app.use('/proxy/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/proxy/api/post', require('./routes/postRouter.js'));
app.use('/proxy/api/comment', require('./routes/commentRouter.js'));
app.use('/proxy/api/img', require('./routes/imgRouter.js'));
app.use('/proxy/upload', require('./routes/upload.js'));


app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});