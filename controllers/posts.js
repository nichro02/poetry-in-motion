let express = require('express')
const router = express.Router()
let db = require('../models')
const axios = require('axios')

//POST /posts - create a new post
router.post('/', (req, res) => {
    const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.access_key}`
    axios.get(unsplashUrl)
    .then(function(apiResponse) {
        photo = apiResponse.data
        console.log(photo)
        res.send('NEW POST ROUTE')
    })
    
})


//GET /posts - display form to create new post
router.get('/', (req, res) => {
    res.send('VIEW POSTS ROUTE')
})

//GET /posts/:id - display a specific post

//UPDATE /posts/:id - update a post

//DELETE /posts/:id - delete a post

module.exports = router