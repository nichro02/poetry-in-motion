let express = require('express')
const router = express.Router()
let db = require('../models')
const axios = require('axios')

//GET /posts/new - create a new post
router.get('/new', (req, res) => {
    console.log('REQ.USER--->',req.user.dataValues)
    const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.access_key}`
    axios.get(unsplashUrl)
    .then(function(apiResponse) {
        const data = {}
        photo = apiResponse.data
        data.imageUrl = photo.urls.regular
        data.photographerName = photo.user.name
        data.photographerLink = photo.links.html
        data.userId = req.user.dataValues.id
        console.log('API RESPONSE',photo)
        console.log('HOTLINK', photo.urls.regular)
        console.log('PHOTOGRAPHER NAME', photo.user.name)
        console.log('PHOTOGRAPHER LINK', photo.user.links.html)
        console.log(data)
        res.render('posts/new.ejs', data)
    })
    
})
//Limit of 50 API requests/hour
//Photos need to be hotlinked
//Need to attribute Unsplash, the photographer, and a link to the photographer's Unsplash profile
//https://help.unsplash.com/en/articles/2511315-guideline-attribution


//POST /posts - display form to create new post
router.post('/', (req, res) => {
    console.log(req.body)
    db.post.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        userId: req.body.userId
    })
    .then(createdPost => {
        console.log('CREATED POST --->', createdPost)
        res.redirect('/')
    })
    .catch(error => {
        console.log(error)
    })
})

//GET /posts/index - view all posts
router.get('/index', (req, res) => {
    res.send('Put list of posts here')
})

//GET /posts/:id - display a specific post

//UPDATE /posts/:id - update a post

//DELETE /posts/:id - delete a post

module.exports = router