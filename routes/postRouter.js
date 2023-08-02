const express = require('express')
const postRouter = express.Router()
const Post = require('../models/Post.js')
const User = require('../models/User.js')

// Get all Posts
postRouter.get('/', (req, res, next) => {
    Post.find()
    .populate({path: 'user', select: 'username'})
    .sort({createdAt: -1})
    .exec((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// Get User Posts
postRouter.get('/user', (req, res, next) => {
    Post.find({user: req.auth._id})
    .populate({path: 'user', select: 'username'})
    .sort({createdAt: -1})
    .exec((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// Get one
postRouter.get('/:postId', (req, res, next) => {
    Post.findOne({_id: req.params.postId})
    .populate({path: 'user', select: 'username'})
    .sort({createdAt: -1})
    .exec((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// Add new Post
postRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newPost = new Post(req.body)
    newPost.save((err, savedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPost)
    })
})

// Delete Post
postRouter.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete(
        {_id: req.params.postId, user: req.auth._id},
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Deleted post ${deletedPost.title}`)
        }
    )
})

// Update Post
postRouter.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

// Like Post
postRouter.put('/like/:postId', (req, res, next) => {
    Post.findByIdAndUpdate(
        {_id: req.params.postId},
        {$addToSet: {likes: req.auth._id}},
        {new: true}
    ).populate("user").exec((err, updatedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedPost)
    })
})

// Unlike Post
postRouter.put('/unLike/:postId', (req, res, next) => {
    Post.findByIdAndUpdate(
        {_id: req.params.postId},
        {$pull: {likes: req.auth._id}},
        {new: true}
    ).populate("user").exec((err, updatedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedPost)
    })
})

module.exports = postRouter