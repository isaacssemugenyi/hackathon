const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const isAuth = require('../config/auth');

// Importing models
const Client = require('../models/clientModel');
const Deposit = require('../models/depositModel')

// Serve the login page
router.get('/login', (req, res)=>{
    res.send('Serves the login page for client already with an account')
})

// Serve the signup page
router.get('/signup', (req, res)=>{
    res.send('Serves the signup page for client on first visit');
})

// Serve the client dashboard after logging in
router.get('/dashboard', isAuth, async (req, res)=>{
    try{
        await Deposit.find({}, {reference : req.user.id}, (err, savings)=>{
            let userDeposit;
            if (savings === null || savings === "" || savings === []){
              userDeposit = 0;
            } else {
              userDeposit = savings
                                .map(saving => saving.amount)
                                .reduce((total, amount) => total + amount, 0);
            }
           res.json('logged in and dashboard is here ' + req.user.accNo+ ' ' +req.user.fullname + userDeposit)
        });
    } catch(err){
        console.log(err.message);
    }
})

//handles creation of new client
router.post('/signup', async(req, res)=>{
    const client = new Client();
    client.fullname = req.body.fullname;
    client.username = req.body.username;
    client.bank = req.body.bank;
    client.accNo = req.body.accNo;
    client.password = req.body.password;

    try{
        await bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(client.password, salt, (error, hash)=>{
                if(error){ console.log(error)
                } else {
                    client.password = hash;
                    client.save((err)=>{
                        if(err) {
                            console.log(err);
                            return;
                        }else {
                            req.flash('success', 'Account created. Please login');
                            res.redirect(303, '/client/login');
                        }
                    })
                }  
            });
        })
    } catch(err){
        console.log(err.message)
    }
})


router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/client/dashboard',
        failureRedirect: '/client/login',
        failureFlash: true
    })(req, res, next);
})

//Staff Logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('Success', 'You are logged out');
    res.redirect('/client/login');
}) 

module.exports = router;