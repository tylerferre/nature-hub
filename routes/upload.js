const express = require('express');
const uploadRouter = express.Router();
const upload = require('../middleware/upload');

uploadRouter.post("/upload", upload.single('file'), (req, res) => {
    if(req.file === undefined) return res.send('You must select an image.');
    const imgUrl = `http://localhost:9000/file/${req.file.originalname}`;
    return res.send(imgUrl);
});


uploadRouter.get('/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
    } catch (error) {
        res.send('Not found');
    }
})

uploadRouter.delete('/:filename', async (req, res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename});
        res.send('Deleted')
    } catch (error) {
        res.send('Error')
    }
})

module.exports = uploadRouter;