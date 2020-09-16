const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    fullname: String,
    username: String,
    bank: String,
    accNo: Number,
    password: String  
})

module.exports = model('clienttest', clientSchema);