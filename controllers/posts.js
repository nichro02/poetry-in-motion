let express = require('express')
const router = express.Router()
let db = require('../models')

//POST /posts - create a new post
router.post('/', (req, res) => {
    res.send('NEW POST ROUTE')
})

//GET /posts/new - display form to create new post

//GET /posts/:id - display a specific post

//UPDATE /posts/:id - update a post

//DELETE /posts/:id - delete a post

module.exports = router