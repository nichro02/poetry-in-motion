require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models/index.js')
let moment = require('moment')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body parser middleware
app.use(express.urlencoded({ extended: false }))
//middleware to hook up css
app.use(express.static(__dirname + '/public/'))
//middleware for update/delete routes
app.use(methodOverride('_method'))
//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//flash middleware must come after session middleware
app.use(flash())
//custom middleware
app.use((req, res, next)=>{
    //attach flash messages and current user to res.locals
    //this will give us access to these values in our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to next piece of middleware
})
//middleware to access moment library
app.use((req, res, next) => {
    res.locals.moment = moment
    next()
  })

//set up middleware for controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/posts', require('./controllers/posts.js'))
app.use('/comments', require('./controllers/comments.js'))

//SET UP HOME ROUTE
app.get('/', (req, res)=> {
    res.render('home.ejs')
})

//SET UP PROFILE ROUTE, USE AUTHORIZATION
app.get('/profile', isLoggedIn, (req, res) => {
    db.post.findAll({
        where: {userId: req.user.dataValues.id}
    })
    .then(posts => {
        console.log(posts)
        res.render('profile.ejs', {posts: posts})
    })
    .catch(error => {
        console.log(error)
    })
})

let server = app.listen(process.env.PORT || 3000, function() {
    console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
})
  
module.exports = server