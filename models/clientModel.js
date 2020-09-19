const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    bank: String,
    accNo: Number,
    password: String,
    mobile: Number,
    gender: String
})

module.exports = model('client', clientSchema);