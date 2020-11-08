let express = require('express')
const router = express.Router()
let db = require('../models')
const axios = require('axios')

//POST /posts - create a new post
router.post('/', (req, res) => {
    const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.access_key}`
    axios.get(unsplashUrl)
    .then(function(apiResponse) {
        const data = {}
        photo = apiResponse.data
        data.imageUrl = photo.urls.regular
        data.photographerName = photo.user.name
        data.photographerLink = photo.links.html
        console.log('API RESPONSE',photo)
        console.log('HOTLINK', photo.urls.regular)
        console.log('PHOTOGRAPHER NAME', photo.user.name)
        console.log('PHOTOGRAPHER LINK', photo.user.links.html)
        //res.send('NEW POST ROUTE')
        res.render('posts/new.ejs', data)
    })
    
})
//Limit of 50 API requests/hour
//Photos need to be hotlinked
//Need to attribute Unsplash, the photographer, and a link to the photographer's Unsplash profile
//https://help.unsplash.com/en/articles/2511315-guideline-attribution


//GET /posts - display form to create new post
router.get('/', (req, res) => {
    res.send('VIEW POSTS ROUTE')
})

//GET /posts/:id - display a specific post

//UPDATE /posts/:id - update a post

//DELETE /posts/:id - delete a post

module.exports = router