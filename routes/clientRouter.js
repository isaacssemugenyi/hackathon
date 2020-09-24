const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const isAuth = require('../config/auth');

// Importing models
const Client = require('../models/clientModel');
const Deposit = require('../models/depositModel')

// nodemailer
const { emailSending } = require('../config/email');

// Serve the login page
router.get('/login', (req, res)=>{
    res.render('login', {page: 'Login'})
})

// Serve the signup page
router.get('/signup', (req, res)=>{
    res.render('signup', {page: 'Sign Up'})
})

// Serve the client dashboard after logging in
router.get('/dashboard', isAuth, async (req, res)=>{
    try{
        await Deposit.find({}, (err, savings)=>{
            // console.log('first', savings)
            let userDeposit;
            let data;
            if (savings === null || savings === "" || savings === []){
              userDeposit = 0;
            } else {
            //   userDeposit = savings
            //         .filter(saving => saving.reference === req.user.id)
            //         .map(saved => parseInt(saved.amount))
            //         .reduce((total, amount) => total + amount, 0);

            data = savings.filter(saving => saving.reference === req.user.id)
            userDeposit = data.map(saved => parseInt(saved.amount))
                            .reduce((total, amount) => total + amount, 0);
            }
            // uncomment this
          res.render('dashboard', {
            total: parseInt(userDeposit), 
            deposits: data, 
            user: req.user.accNo, 
            name: req.user.fullname,
            page: 'Dashboard' 
         }) 
           
        //    res.json('logged in and dashboard is here ' + req.user.accNo+ ' ' +req.user.fullname + parseInt(userDeposit) +''+ data)
        });
    } catch(err){
        redirect('/500');
        console.log(err.message);
    }
})

//handles creation of new client
router.post('/signup', async(req, res)=>{
    const client = new Client();
    client.fullname = req.body.fullname;
    client.username = req.body.username;
    client.email = req.body.email;
    client.bank = req.body.bank;
    client.accNo = req.body.accNo;
    client.password = req.body.password;
    client.mobile = req.body.mobile;
    client.gender = req.body.gender;

    try{
        await bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(client.password, salt, (error, hash)=>{
                if(error){ console.log(error)
                } else {
                    client.password = hash;
                    emailSending(req.body.email, req.body.fullname, `You have signed up ${req.body.fullname}`);
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
        redirect('/500');
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
    res.redirect('/');
}) 

module.exports = router;