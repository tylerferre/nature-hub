const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.URI,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if(match.indexOf(file.mimetype) === -1){
            const filename = file.orignialname;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: file.orignialname
        }
    }
});

module.exports = multer({storage})