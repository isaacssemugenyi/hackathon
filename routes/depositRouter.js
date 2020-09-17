const router = require('express').Router();
const axios = require('axios');

const isAuth = require('../config/auth');
// const isAllowed = require('../config/access')

//

// Importing models
//const Client = require('../models/clientModel')
const Deposit = require('../models/depositModel');

// nodemailer
const { emailSending } = require('../config/email')

//Access the page to add money to a savings scheme
router.get('/', isAuth,  (req, res)=>{
    res.render('deposit')
})

router.post('/', isAuth,  async(req, res)=>{
    const deposit = new Deposit();
    deposit.amount = req.body.amount;
    deposit.reference = req.user.id;
    deposit.createdAt = Date.now();
    try{
    const postReq =  await axios.post('http://teamtime.hipipo.mojaloop-hackathon.io:4301/transfers', 
    {
        "from": { "displayName": req.user.fullname, "idType": "MSISDN", "idValue": req.user.id },
        "to": { "idType": "MSISDN", "idValue": "498941207269" },
        "amountType": "SEND",
        "currency": "EUR",
        "amount": req.body.amount,
        "transactionType": "TRANSFER",
        "initiatorType": "CONSUMER",
        "note": "test payment",
        "homeTransactionId": "{{$guid}}"
    })
    if(postReq.status === 200){
        emailSending(req.user.email, req.user.accNo, `You have a deposit of ${req.body.amount} at ${Date.now()}`);
        await deposit.save();
        req.flash('success', 'Successfully saved');
        res.redirect('/client/dashboard');
    }// } else{
    //     req.flash('Was unable to save data');
    //     res.redirect('/client/dashboard');
    // }   
    } catch(err){
        req.flash('error','Unable to connect to mojaloop')
        res.redirect('/client/dashboard');
        // throw new Error(err.message)
    }
})

module.exports = router;