
const LocalStrategy = require ('passport-local').Strategy;
const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');


/// LOAD USER MODEL 
    const User = mongoose.model('users');

    module.exports = function(passport){
        passport.use (new LocalStrategy(
          (tel, pwd,done)=> {
            User.findOne({ phoneNumber: tel }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.pwd(pwd)) {
                  return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
        })
    })
    )
}