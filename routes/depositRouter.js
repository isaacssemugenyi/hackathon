const router = require('express').Router();
const axios = require('axios');

const isAuth = require('../config/auth');

//

// Importing models
const Deposit = require('../models/depositModel');

// nodemailer
const { emailSending } = require('../config/email')

//Access the page to add money to a savings scheme
router.get('/', isAuth,  (req, res)=>{
    res.render('deposit', {page: 'Deposit'})
})

router.post('/', isAuth,  async(req, res)=>{
    const deposit = new Deposit();
    deposit.amount = req.body.amount;
    deposit.reference = req.user.id;
    deposit.createdAt = Date.now();
    try{
        emailSending(req.user.email, req.user.accNo, `You have deposited ${req.body.amount} EUR to your account : ${req.user.accNo}`);
        await deposit.save();
        req.flash('success', 'Successfully saved');
        res.redirect('/client/dashboard');  
    } catch(err){
        req.flash('error','An error occured, Please try again')
        res.redirect('/client/dashboard');
    }
})

module.exports = router;