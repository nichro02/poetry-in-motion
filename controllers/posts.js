let express = require('express')
const router = express.Router()
let db = require('../models')
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

//GET /posts/new - create a new post
router.get('/new',isLoggedIn, (req, res) => {
    //console.log('REQ.USER--->',req.user.dataValues)
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
        //console.log('API RESPONSE',photo)
        //console.log('HOTLINK', photo.urls.regular)
        //console.log('PHOTOGRAPHER NAME', photo.user.name)
        //console.log('PHOTOGRAPHER LINK', photo.user.links.html)
        //console.log(data)
        res.render('posts/new.ejs', data)
    })
    .catch(error => {
        console.log(error)
    })
})
//Limit of 50 API requests/hour
//Photos need to be hotlinked
//Need to attribute Unsplash, the photographer, and a link to the photographer's Unsplash profile
//https://help.unsplash.com/en/articles/2511315-guideline-attribution

//POST /posts - display form to create new post
router.post('/', isLoggedIn, (req, res) => {
    db.post.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        userId: req.body.userId,
        photographerName: req.body.photographerName
    })
    .then(createdPost => {
        console.log('CP -----> ',createdPost)
        res.redirect(`/posts/${createdPost.dataValues.id}`)
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
        //console.log('POSTS--->',posts)
        res.render('posts/index.ejs', {posts: posts})
    })
    .catch(error => {
        console.log(error)
    })
})

//GET /posts/:id - display a specific post
router.get('/:id', (req, res) => {
    let postId = req.params.id
    db.post.findOne({
        where: {id: postId},
        include: [db.user, db.comment]
    })
    .then(post => {
        res.render('posts/show.ejs', {post: post})
    })
    .catch(error => {
        console.log(error)
    })
})

//UPDATE /posts/:id - update a post
router.get('/update/:id', isLoggedIn, (req, res) => {
    let postId = req.params.id
    db.post.findOne({
        where: {id: postId},
        include: [db.user] 
    })
    .then(post => {
        console.log('POST INFOR ----->', post)
        if(post.dataValues.userId === req.user.id) {
        res.render('posts/update.ejs', {post: post})
        } else {
            res.redirect(`/posts/${postId}`)
        }
    })
    .catch(error => {
        console.log(error)
        res.render('/')
    })
})

router.put('/update/:id', (req, res) => {
    const updates = {}
    updates.title = req.body.title
    updates.content = req.body.content
    let postId = req.body.postId
    db.post.update(updates, {where: {id: req.body.postId}})
    .then(updatedPost => {
        res.redirect(`/posts/${postId}`)
    })
    .catch(error => {
        console.log(error)
    })
})

//DELETE /posts/:id - delete a post
router.delete('/:id', isLoggedIn, (req, res) => {
    let postId = parseInt(req.params.id)
    db.post.destroy({
        where: {id: postId, userId: req.user.id},
        include: [db.user]
    })
    .then(deletedPost => {
        console.log(`ROW ${postId} DELETED`)
        res.redirect('/')
        
    })
    .catch(error => {
        console.log(error)
        //res.redirect(`/posts/${postId}`)
    })
})

module.exports = router