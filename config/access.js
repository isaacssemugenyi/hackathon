const Client = require('../models/clientModel');

//Authorization logic
module.exports  = function isAuthorized(req, res, next) {
  Client.findById(req.user.id).exec(function (error, user) {
      if (error) {
          return next(error);
      } else {      
          if (user.id === req.user.id) {   
              return next();  
          } else {
            req.flash('danger', 'Not Authorized')
            res.redirect('/client/dashboard');
          }
      }
  });
}