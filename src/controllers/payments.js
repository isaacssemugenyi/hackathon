const PaymentModel = require('../models/payments')
const { emailSending } = require('../config/email')

exports.PaymentController = {
    async getpayments(req, res) {
        try {
            const payment = await PaymentModel.find();
            return res.json(payment);
        } catch(err){
            throw new Error("Failed to get products");
        }
    },
    async createNewPayment(req, res) {
        const payment = new Payment();
        payment.amount = req.body.amount;
        payment.reference = req.user.id;
        payment.createdAt = Date.now();
       
        try {
            emailSending(req.user.email, req.user.accNo, `You have deposited ${req.body.amount} EUR to your account : ${req.user.accNo}`);
            await payment.save();
            return res.json(payment);;
            //res.redirect('/dashboard'); 
        } catch(err){
            throw new Error("Failed to make a deposit");

        }
    },
    async updatePayment(req, res) {
    const payment = new Payment();
    payment.amount = req.body.amount;
    payment.reference = req.user.id;
    payment.createdAt = Date.now(); 
        
        try {
            const id = req.params.id;
            const response = await PaymentModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
            return res.json(response);
        } catch(err){
            throw new Error("Failed to updated user");
        }
    },
    // async deletePayment(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await PaymentModel.findByIdAndDelete({_id: id});
    //         return res.json({message: 'Resource deleted successfully'});
    //     } catch(err){
    //         throw new Error("Failed to delete user");
    //     }
    // }
}