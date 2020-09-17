const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    fullname: String,
    username: String,
    bank: String,
    accNo: Number,
    password: String,
    mobile: Number 
})

module.exports = model('clienttest', clientSchema);