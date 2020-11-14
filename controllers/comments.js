let express = require('express')
const router = express.Router()
let db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

//POST /comments  add comment to a post
router.post('/', isLoggedIn, (req,res) => {
    db.comment.create({
        name: req.user.dataValues.name,
        content: req.body.content,
        postId: parseInt(req.body.postId),
        userId: parseInt(req.body.userId)
    })
    .then(comment => {
        res.redirect(`/posts/${req.body.postId}`)
    })
    .catch(error => {
        res.send('Apologies, we\'ve encountered an error')
    })
})

module.exports = router