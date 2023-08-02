const express = require('express')
const imgRouter = express.Router()
const Img = require('../models/Img.js')

// Get all Imgs
imgRouter.get('/', (req, res, next) => {
    Img.find()
    .populate({path: 'user', select: 'username'})
    .sort({createdAt: -1})
    .exec((err, img) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(img)
    })
})

// Get Img for Post
imgRouter.get('/:imgId', (res, req, next) => {
    Img.find({img: req.params.imgId}, (err, imgs) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(imgs)
    })
})

// Post new Img
imgRouter.post('/:imgId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.post = req.params.imgId
    const newImg = new Img(req.body)
    newImg.save((err, savedImg) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedImg)
    })
})

// Delete Img
imgRouter.delete('/:imgId', (req, res, next) => {
    Img.findOneAndDelete(
        {_id: req.params.imgId, user: req.auth._id}, 
        (err, deletedImg) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Comment deleted`)
        }
    )
})

module.exports = imgRouter