//Require dependencies
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Importing Agent model and link to db
const Client = require('../models/clientModel');
require('./db');

module.exports = function(passport){
    //Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
        //Match Username
        let query = {username : username};
        Client.findOne(query, function(err, client){
            if(err) throw err;
            if(!client){
                return done(null, false, {message: 'Wrong Username or Password'});
            }

            //Match Password
            bcrypt.compare(password, client.password, function(err, isPassword){
                if(err) throw err;
                if(isPassword){
                    return done(null, client);
                }else{
                    return done(null, false, {message: 'Wrong Username or Password'});
                }
            });
        });
    }));

    passport.serializeUser(function(client, done){
        done(null, client.id);
    });

    passport.deserializeUser(function(id, done){
        Client.findById(id, function(err, client){
            done(err, client);
        })
    })
}