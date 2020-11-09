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
        data.userName = req.user.dataValues.name
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
    db.post.findAll({
        include: [db.user]
    })
    .then(posts => {
        console.log(posts)
        res.render('posts/index.ejs', {posts: posts})
    })
})

//GET /posts/:id - display a specific post
router.get('/:id', (req, res) => {
    db.post.findOne({
        where: {id: req.params.id},
        include: [db.user, db.comment]
    })
    .then(post => {
        res.render('posts/show.ejs', {post: post})
    })
})

//UPDATE /posts/:id - update a post

//DELETE /posts/:id - delete a post

module.exports = router