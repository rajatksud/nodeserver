const passport = require('passport');
const sess = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys= require('../config/keys')

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
     .then(user=>
        {done(null,user)});
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret ,
    callbackURL:'/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done)=>{
    //console.log('access token: ', accessToken);
    //console.log('refresh token : ', refreshToken);
    console.log('Profile : ', profile);
    User.findOne({googleID:profile.id})
    .then((existingUser)=>{
        if (existingUser) {
        console.log('Found an existing User', profile.id);
        done(null, existingUser);
        }
        else {
        new User({googleID:profile.id,
                  name:profile.displayName,
                  email:profile.emails[0].value})
        .save()
        .then(user => done(null, user));
        }      

    });

    })
);