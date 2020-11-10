let express = require('express')
const router = express.Router()
let db = require('../models')

//POST /comments  add comment to a post
router.post('/', (req,res) => {
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
        console.log(error)
    })
})

module.exports = router