const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

router.get('/signup', (req, res)=> {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res)=> {
    console.log('SIGNUP FORM INFO --->',req.body)
    //check if user already exists
    //if yes, throw error message
    //else create new user and store them in database
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([createdUser, wasCreated])=> {
        if(wasCreated){
            console.log(`CREATED USER----> ${createdUser}`)
            //log new user in
            passport.authenticate('local' , {
                successRedirect: '/',
                successFlash: 'Account created and logged in!'//flash message
            })(req, res) //(req, res) is an immediately invoked function
        } else {
            req.flash('error', 'email already exists, try logging in')
            res.redirect('/auth/login')
            //console.log('Account with that email already exists. Try logging in')
        }
        //redirect to login page
        //res.redirect('/auth/login')
    })
    .catch(err=>{
        //console.log('Did not post new signup to database --->', err)
        req.flash('error', err.message)
        res.redirect('/auth/signup')
    })
})

router.get('/login', (req, res)=> {
    res.render('auth/login.ejs')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password',
    successFlash: 'You are now logged in'
}))

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'Successfully logged out')
    res.redirect('/')
})

module.exports = router