const { Schema, model } = require('mongoose');

const PaymentSchema = new Schema({
    amount: {type: Number, required: true },
    reference: {type: String, required: true },
    createdAt: {type: Date, required: true } 
})

const Payment = model('Payment', PaymentSchema)
module.exports = Payment;