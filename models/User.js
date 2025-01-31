const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: 
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw4QDQ0NDQ0ODQ0NDg0ODQ8NDQ4OFREWFhURExUZHSggGBolGxMVITEhJSkrLi4uFx8zPjMsNygtLisBCgoKDQ0NDg0NDysZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABAIDBQEGB//EAC0QAQABAgQFAwMEAwAAAAAAAAABAgMEESExEkFRYXGBkbEyofBCUpLRBSLB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGqu/THeezTViap2yj7grEE3Kp5z7sQdEc5lFdUbTPuC8SU4iqN8pbaMRTO+nwDcAAAAAAAAAAAAAAAAAADXeu8PnlAPblyKd/bmluXZq7R0YVVTOs7vFQAAYVXqY3n/qe/ez0jb5aAXReonn76Njmttm9NPeOnQFoRIDO3cmnb25KrV2Ku09EREg6I02L3FpO/wAtyKAAAAAAAAAAAAAAwuV8MZ+yKqqZnOd2d65xT2jSGtUAAGrE15U950bUuMnWI7AnAAABXhK84mOm3hvR4acqo7xMLAAAIlbZucUd43RMrdfDOf5kC8eROb1FAAAAAAAAAAGrEV5U950bUmKqznLpANICoAAJMX9UeI+ZVpsZTtPoCYAAAGzD/VHr8LkmEp1mekKwAAAAVYWvOMunw3orFWVUd9FqKAAAAAAAAAAILk51T5le5wACoAAMblHFEx+ZsgHOmMtJ3eLrtmKu09UtVmqOWfjUGsbKbNU/pn10UWbEU6zrP2gGVijhjvOstgAAAAARLow5y+3tHiPhFZAAAAAAAAAAOc6KC5GUz5kGICoAADyqqIjOdIS3MRM7aR9wVjnTVM7zM+pmDojnZkTPWQdER28RVG+sd91VFcVRnAMgAAAF9v6afEfCB0IRXoAAAAAAAAACTE05VeYVtOJpzjPp8AkAVAGnE15U5c509AaL9zintG39tQAAAA9AZWrk0zn7x1YAOjE56xzep8JXpMdNY8KAAAZ2ac6o91yfCU7z6QoRQAAAAAAAAAAAEN2jhnLly8MFt63xR3jZFMKgixNedXaNFdyrhiZ/M3PAAAAAAAABnar4Ziffwvc1dh686Y7aA2PaKc5iIeK8Pa4YzneftANtMZRlHJ6CKAAAA8HoAAAAAAA037PFrG/y3AOLjKtqemspnbxWEpua7Vcqv7cm/YqtzlVHieUqjUD0HgAAAAADfhaspy6/LXat1VzlTEzPx5dXCYKKNav9qvtHgGdizlrO/KOigEUAAAAAAAAAAAAAAAAeVUxMZTETHSdYegIb3+OpnWieGek6wiuYK7T+nijrTq7YD52YmN4mPOjx9FMZ76sJsW/2UfxgHAexrs70WLf7KP4wzimI2iI8aA4lvCXKtqZjvOiyz/jIj66s+0aR7ugAxooimMqYiI6QyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=='
    }
})

// Hide password
userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

// Check password
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

// Remove password from object
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)
