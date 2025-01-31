const express = require('express')
const authRouter = express.Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

// Signup
// authRouter.post('/signup', (req, res, next) => {
//     User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         if(user){
//             res.status(403)
//             return next(new Error('That username is already taken'))
//         }
//         const newUser = new User(req.body)
//         newUser.save((err, savedUser) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
//             return res.status(201).send({token, user: savedUser.withoutPassword()})
//         })
//     })
// })

authRouter.post('/signup', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('That email is already in use'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

// Login
// authRouter.post('/login', (req, res, next) => {
//     User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         if(!user){
//             res.status(403)
//             return next(new Error('Username or password are incorrect'))
//         }

//         user.checkPassword(req.body.password, (err, isMatch) => {
//             if(err){
//                 res.status(403)
//                 return next(new Error('Username or password are incorrect'))
//             }
//             if(!isMatch){
//                 res.status(403)
//                 return next(new Error('Username or password are incorrect'))
//             }
//             const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
//             return res.status(201).send({token, user: user.withoutPassword()})
//         })
//     })
// })

authRouter.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Username or password are incorrect'))
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error('Username or password are incorrect'))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Username or password are incorrect'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: user.withoutPassword()})
        })
    })
})

authRouter.put('/update/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser.withoutPassword())
        }
    )
})

// authRouter.delete('/delete/:userId', (req, res, next) => {
//     User.findOneAndDelete(
//         {_id: req.params.userId},
//         (err, deletedUser) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(`${deletedUser.username} has been deleted `)
//         }
//     )
// })

module.exports = authRouter