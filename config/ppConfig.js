const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')

//configure strategy
passport.serializeUser((user, doneCallback) => {
    console.log('SERIALIZING USER...')
    doneCallback(null, user.id)
})

passport.deserializeUser((id, doneCallback) => {
    db.user.findByPk(id)
    .then(foundUser => {
        console.log('DESERIALIZING USER...')
        doneCallback(null, foundUser)
    })
    .catch(error=>{
        console.log('error deserializing user')
    })
})

const findAndLogInUser = (email, password, doneCallback) => {
    db.user.findOne({where: {email: email}})
    .then(async foundUser=>{
        let match
        if(foundUser){
            match = await foundUser.validPassword(password)
        }
        if(!foundUser || !match) { //problem validating user
            return doneCallback(null, false) //send back false
        } else { //legit user
            return doneCallback(null, foundUser) //send found user object
        }
    })
    .catch(error => doneCallback(error))
}

const fieldsToCheck = {
    usernameField: 'email', //we're using email as username
    passwordField: 'password'
}

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)

passport.use(strategy)

module.exports = passport