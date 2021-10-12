const { PaymentController } = require('../controllers/payments')

module.exports = (app) => {
    app.route('/payments')
        .get(PaymentController.getpayments)
        .post(PaymentController.createNewPayment);
    app.route('/products/:id')
        .put(PaymentController.updatePayment)
        //.delete(PaymentController.deletePayment);

 
}