const express = require('express');
const uploadRouter = express.Router();
const uplaod = require('../middleware/upload');

uploadRouter.post("/upload", uplaod.single('file'), (req, res) => {
    if(req.file === undefined) return res.send('You must select an image.');
    const imgUrl = `http://localhost:9000/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = uploadRouter;