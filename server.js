const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

const config = require('./config/db');

const port = process.env.PORT || 6060;

// Middlewares
app.use(express.json());
// app.use(express.static(__dirname, 'public'));

// Importing routes
const defaultRoutes = require('./routes/defaultRouter')
const clientRoutes = require('./routes/clientRouter')
const depositRoutes = require('./routes/depositRouter')

// DB config
mongoose.connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(once => {
    console.log('Connected to DB')
    app.listen(port, ()=> console.log(`Server running on port ${port}`))
}).catch(err => console.log(err.message))

app.use(express.static(path.join(__dirname , 'public'))); //Using static files
app.use(express.urlencoded({extended: true})) // Accessing form data

// Express session middleware
app.use(session({ 
  secret: 'mostsecretwordeverseen', 
  resave: true, 
  saveUninitialized: true
}));

// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res); 
  next();
});

//Passport Config and middleware
require('./config/passport')(passport); 
app.use(passport.initialize());
app.use(passport.session());

//Global variable for loggedin users
app.get('*', (req, res, next)=>{
  res.locals.user = req.user || null;
  next();
})


app.use('/', defaultRoutes)
app.use('/client', clientRoutes)
app.use('/deposit', depositRoutes)

//Handle missing routes
app.get('*', (req, res)=>{
    res.send('Page does not exist');
  })
