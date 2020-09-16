const router = require('express').Router();

const isAuth = require('../config/auth');
// const isAllowed = require('../config/access')

// Importing models
const Client = require('../models/clientModel')
const Deposit = require('../models/depositModel');

//Access the page to add money to a savings scheme
router.get('/', isAuth,  (req, res)=>{
    res.json('Serving the page with the serving form')
})

router.post('/', isAuth,  async(req, res)=>{
    const deposit = new Deposit();
    deposit.amount = req.body.amount;
    deposit.reference = req.user.id;
    deposit.createdAt = Date.now();

    try {
       const saving = await deposit.save();
        res.status(200).json(saving);
        // res.status(200).redirect('/deposit');
    } catch(err){
        throw new Error(err.message)
    }
})

module.exports = router;