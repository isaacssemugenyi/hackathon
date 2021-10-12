const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    bank: String,
    accNo: Number,
    password: String,
    mobile: Number,
    gender: String
})

const User = model('User', UserSchema)
module.exports = User;