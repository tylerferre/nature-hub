const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment.js')
const User = require('../models/User.js')

// Get all Comments
commentRouter.get('/', (req, res, next) => {
    Comment.find()
    .populate({path: 'user', select: 'username profilePic'})
    .sort({createdAt: -1})
    .exec((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// Get Comments for Post
// commentRouter.get('/:postId', (res, req, next) => {
//     Comment.find({post: req.params.postId}, (err, posts) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(posts)
//     })
// })

commentRouter.post(
    '/:postId',
    async (req, res, next) => {
      try {
        const user = await User.findById(req.auth._id);
        req.body.user = user._id;
        req.body.post = req.params.postId;
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        await savedComment.populate({
          path: 'user',
          select: 'username profilePic',
        });
        return res.status(201).send(savedComment);
      } catch (err) {
        res.status(500);
        return next(err);
      }
    }
  );

// Post new Comment
commentRouter.post('/:postId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.post = req.params.postId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedComment)
    })
})

// Delete Comment
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, user: req.auth._id}, 
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Comment deleted`)
        }
    )
})

module.exports = commentRouter