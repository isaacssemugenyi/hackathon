const { Schema, model } = require('mongoose');

const depositSchema = new Schema({
    amount: String,
    reference: Schema.Types.ObjectId,
    createdAt: {
        type: String,
        default: Date.now()
    }
    
})

module.exports = model('account', depositSchema);